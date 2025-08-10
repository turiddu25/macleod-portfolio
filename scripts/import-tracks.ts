import fs from 'fs/promises';
import path from 'path';
import * as mm from 'music-metadata';
import { nanoid } from 'nanoid';

// --- Script Configuration ---
const tracksDir = path.join(process.cwd(), 'lib', 'spotify-albums', '[SPOTDOWNLOADER.COM] Mastering');
const outputFilePath = path.join(process.cwd(), 'import.ndjson');
const producerRole = 'Mastering';
const slider = 'top';

async function exportTracks() {
  console.log('Starting track export...');
  let ndjson = '';

  try {
    const files = await fs.readdir(tracksDir);
    const mp3Files = files.filter((file) => file.endsWith('.mp3'));

    if (mp3Files.length === 0) {
      console.log('No MP3 files found in the directory.');
      return;
    }

    console.log(`Found ${mp3Files.length} MP3 files. Processing...`);

    for (const file of mp3Files) {
      const filePath = path.join(tracksDir, file);
      console.log(`\nProcessing: ${file}`);

      try {
        const metadata = await mm.parseFile(filePath);
        const { title, artist } = metadata.common;

        if (!title || !artist) {
          console.warn(`  - Skipping: Missing title or artist metadata.`);
          continue;
        }

        console.log(`  - Title: ${title}`);
        console.log(`  - Artist: ${artist}`);

        const trackDocument = {
          _type: 'track',
          _id: nanoid(),
          title,
          artist,
          slug: {
            _type: 'slug',
            current: `${artist}-${title}`.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
          },
          producerRole,
          slider,
        };

        ndjson += JSON.stringify(trackDocument) + '\n';
      } catch (error) {
        console.error(`  - Error processing ${file}:`, error);
      }
    }

    await fs.writeFile(outputFilePath, ndjson);
    console.log(`\nExport complete! Data saved to ${outputFilePath}`);
    console.log('Next step: Run `sanity dataset import import.ndjson` to upload the data.');

  } catch (error) {
    console.error('An error occurred during the export process:', error);
  }
}

exportTracks();