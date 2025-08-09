"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSanityImageConfig = void 0;
exports.getClient = getClient;
exports.getSettings = getSettings;
exports.getAllTracks = getAllTracks;
exports.getAllTracksSlugs = getAllTracksSlugs;
exports.getTrackBySlug = getTrackBySlug;
const sanity_api_1 = require("lib/sanity.api");
const sanity_queries_1 = require("lib/sanity.queries");
const next_sanity_1 = require("next-sanity");
function getClient(preview) {
    if (!sanity_api_1.projectId || !sanity_api_1.dataset) {
        throw new Error('Missing projectId or dataset. Check your .env.local file.');
    }
    const client = (0, next_sanity_1.createClient)({
        projectId: sanity_api_1.projectId,
        dataset: sanity_api_1.dataset,
        apiVersion: sanity_api_1.apiVersion,
        useCdn: sanity_api_1.useCdn,
        perspective: 'published',
        stega: {
            enabled: (preview === null || preview === void 0 ? void 0 : preview.token) ? true : false,
            studioUrl: sanity_api_1.studioUrl,
        },
    });
    if (preview) {
        if (!preview.token) {
            throw new Error('You must provide a token to preview drafts');
        }
        return client.withConfig({
            token: preview.token,
            useCdn: false,
            ignoreBrowserTokenWarning: true,
            perspective: 'drafts',
        });
    }
    return client;
}
const getSanityImageConfig = () => getClient();
exports.getSanityImageConfig = getSanityImageConfig;
async function getSettings(client) {
    return (await client.fetch(sanity_queries_1.settingsQuery)) || {};
}
// Track-related functions for the portfolio
async function getAllTracks(client) {
    return (await client.fetch(sanity_queries_1.tracksQuery)) || [];
}
async function getAllTracksSlugs() {
    const client = getClient();
    const slugs = (await client.fetch(sanity_queries_1.trackSlugsQuery)) || [];
    return slugs.map((slug) => ({ slug }));
}
async function getTrackBySlug(client, slug) {
    return (await client.fetch(sanity_queries_1.trackBySlugQuery, { slug })) || {};
}
