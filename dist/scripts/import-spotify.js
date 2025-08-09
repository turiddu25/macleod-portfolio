"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
/**
 * Script to import tracks from a Spotify playlist to Sanity
 *
 * Usage:
 * # Import from a specific playlist (recommended)
 * npx ts-node --require tsconfig-paths/register scripts/import-spotify.ts --playlistId YOUR_PLAYLIST_ID
 *
 * # To specify a producer role (optional)
 * npx ts-node --require tsconfig-paths/register scripts/import-spotify.ts --playlistId YOUR_PLAYLIST_ID --producerRole "Your Role"
 */
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const sanity_client_1 = require("../lib/sanity.client");
const slugify_1 = require("../lib/slugify");
// --- Argument Parsing ---
async function parseArguments() {
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option('playlistId', {
        alias: 'p',
        description: 'Spotify playlist ID',
        type: 'string',
        demandOption: true,
    })
        .option('producerRole', {
        alias: 'r',
        description: 'Role as a producer',
        type: 'string',
        default: 'Producer',
    }).argv;
    return {
        playlistId: argv.playlistId,
        producerRole: argv.producerRole,
    };
}
// --- Spotify API ---
async function getSpotifyToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Spotify API credentials not found in .env');
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
    });
    if (!response.ok) {
        throw new Error(`Failed to get Spotify token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
}
// --- Main Execution ---
async function main() {
    console.log('Spotify import script started...');
    const args = await parseArguments();
    try {
        const spotifyToken = await getSpotifyToken();
        console.log('Successfully authenticated with Spotify.');
        const tracks = await fetchAllPlaylistTracks(args.playlistId, spotifyToken);
        console.log(`Fetched ${tracks.length} tracks from playlist.`);
        const sanityClient = (0, sanity_client_1.getClient)();
        for (const spotifyTrack of tracks) {
            await createSanityTrack(spotifyTrack, sanityClient, args.producerRole);
        }
        console.log('✅ All tracks imported successfully!');
    }
    catch (error) {
        console.error('Error during script execution:', error.message);
        process.exit(1);
    }
}
// --- Spotify API ---
async function fetchAllPlaylistTracks(playlistId, token) {
    let allTracks = [];
    let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`;
    while (nextUrl) {
        const response = await fetch(nextUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch playlist: ${response.statusText}`);
        }
        const data = await response.json();
        allTracks = allTracks.concat(data.items);
        nextUrl = data.next;
    }
    return allTracks;
}
// --- Sanity Data Creation ---
async function createSanityTrack(spotifyTrack, client, producerRole = 'Producer' // Default role
) {
    var _a;
    const { track } = spotifyTrack;
    const { name, artists, album, external_urls } = track;
    // 1. Check if track already exists
    const existingTrack = await client.fetch(`*[_type == "track" && slug.current == $slug][0]`, { slug: (0, slugify_1.slugify)(`${artists[0].name}-${name}`) });
    if (existingTrack) {
        console.log(`Skipping existing track: ${name}`);
        return;
    }
    // 2. Upload cover image to Sanity
    const imageUrl = (_a = album.images[0]) === null || _a === void 0 ? void 0 : _a.url;
    let imageAsset;
    if (imageUrl) {
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        imageAsset = await client.assets.upload('image', Buffer.from(imageBuffer), {
            filename: (0, slugify_1.slugify)(`${album.name}-cover.jpg`),
        });
    }
    // 3. Create the track document
    const newTrack = {
        _type: 'track',
        title: name,
        artist: artists.map((a) => a.name).join(', '),
        slug: { current: (0, slugify_1.slugify)(`${artists[0].name}-${name}`) },
        trackUrl: external_urls.spotify,
        producerRole,
        coverImage: imageAsset
            ? {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAsset._id },
                alt: `Cover art for ${name}`,
            }
            : undefined,
    };
    await client.create(newTrack);
    console.log(`Imported: ${newTrack.title}`);
}
main();
