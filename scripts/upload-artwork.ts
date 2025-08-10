import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';

import sanityEnv from '../sanity.env.json';

// --- Sanity Project Details ---
const { SANITY_PROJECT_ID: projectId, SANITY_DATASET: dataset, SANITY_API_TOKEN: token } = sanityEnv;

// --- Script Configuration ---
const artworkDir = path.join(process.cwd(), 'lib', 'spotify-pictures');

// --- Sanity Client ---
const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2021-10-21',
});

// Helper to format strings for matching
const formatForMatch = (str: string) => str.toLowerCase().replace(/_/g, ' ');

async function uploadArtwork() {
  console.log('Starting artwork upload...');

  if (!projectId || !dataset || !token) {
    console.error('Missing Sanity project details. Make sure SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_TOKEN are set in your .env.local file.');
    return;
  }

  try {
    // 1. Fetch all tracks from Sanity
    const tracks = await client.fetch('*[_type == "track"]{_id, title, artist}');
    if (!tracks || tracks.length === 0) {
      console.log('No tracks found in Sanity.');
      return;
    }
    console.log(`Found ${tracks.length} tracks in Sanity.`);

    // 2. Read image files from the directory
    const files = await fs.readdir(artworkDir);
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));
    if (imageFiles.length === 0) {
      console.log('No image files found in the artwork directory.');
      return;
    }
    console.log(`Found ${imageFiles.length} image files.`);

    // 3. Process each image
    for (const file of imageFiles) {
      console.log(`\nProcessing: ${file}`);

      try {
        // Parse filename
        const parts = path.basename(file, path.extname(file)).split('_');
        const artist = formatForMatch(parts.slice(1, -1).join(' '));
        const title = formatForMatch(parts[parts.length - 1]);
        
        console.log(`  - Parsed Artist: ${artist}`);
        console.log(`  - Parsed Title: ${title}`);

        // Find matching track
        const matchingTrack = tracks.find(
          (track) =>
            formatForMatch(track.artist) === artist &&
            formatForMatch(track.title) === title
        );

        if (matchingTrack) {
          console.log(`  - Found matching track: ${matchingTrack.title}`);

          // Upload image
          const imageBuffer = await fs.readFile(path.join(artworkDir, file));
          const imageAsset = await client.assets.upload('image', imageBuffer, {
            filename: file,
          });
          console.log(`  - Image uploaded: ${imageAsset._id}`);

          // Update track
          await client
            .patch(matchingTrack._id)
            .set({
              coverImage: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
                },
              },
            })
            .commit();
          console.log(`  - Track updated successfully.`);
        } else {
          console.warn(`  - No matching track found for this image.`);
        }
      } catch (error) {
        console.error(`  - Error processing ${file}:`, error);
      }
    }

    console.log('\nArtwork upload complete!');
  } catch (error) {
    console.error('An error occurred during the artwork upload process:', error);
  }
}

uploadArtwork();