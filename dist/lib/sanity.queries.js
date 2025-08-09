"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackSlugsQuery = exports.trackBySlugQuery = exports.tracksQuery = exports.settingsQuery = void 0;
const groq_1 = __importDefault(require("groq"));
const trackFields = (0, groq_1.default) `
  _id,
  title,
  artist,
  _updatedAt,
  coverImage,
  "slug": slug.current,
  trackUrl,
  producerRole,
`;
exports.settingsQuery = (0, groq_1.default) `*[_type == "settings"][0]`;
exports.tracksQuery = (0, groq_1.default) `
*[_type == "track"] | order(_updatedAt desc) {
  ${trackFields}
}`;
exports.trackBySlugQuery = (0, groq_1.default) `
*[_type == "track" && slug.current == $slug][0] {
  content,
  ${trackFields}
}
`;
exports.trackSlugsQuery = (0, groq_1.default) `
*[_type == "track" && defined(slug.current)][].slug.current
`;
