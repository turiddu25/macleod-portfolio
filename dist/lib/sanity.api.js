"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioUrl = exports.DRAFT_MODE_ROUTE = exports.apiVersion = exports.readToken = exports.projectId = exports.dataset = exports.useCdn = void 0;
exports.useCdn = false;
/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */
exports.dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
exports.projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
exports.readToken = process.env.SANITY_API_READ_TOKEN || '';
// see https://www.sanity.io/docs/api-versioning for how versioning works
exports.apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-27';
// Used to generate URLs for previewing your content
exports.DRAFT_MODE_ROUTE = '/api/draft-mode/enable';
/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
exports.studioUrl = '/studio';
function assertValue(v, errorMessage) {
    if (v === undefined) {
        // In a script context, we might not have the env vars, so return empty string
        if (typeof process.env.npm_lifecycle_event !== 'undefined') {
            return '';
        }
        throw new Error(errorMessage);
    }
    return v;
}
