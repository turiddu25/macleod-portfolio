"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlForImage = void 0;
const image_url_1 = __importDefault(require("@sanity/image-url"));
const sanity_api_1 = require("lib/sanity.api");
const imageBuilder = (0, image_url_1.default)({ projectId: sanity_api_1.projectId, dataset: sanity_api_1.dataset });
const urlForImage = (source) => imageBuilder.image(source).auto('format').fit('max');
exports.urlForImage = urlForImage;
