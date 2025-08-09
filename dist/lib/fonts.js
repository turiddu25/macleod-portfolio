"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baunk = exports.crenzo = exports.chillax = void 0;
const local_1 = __importDefault(require("next/font/local"));
exports.chillax = (0, local_1.default)({
    src: [
        {
            path: '../public/fonts/Chillax-Extralight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/Chillax-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/Chillax-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Chillax-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/Chillax-Semibold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/Chillax-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-chillax',
    display: 'swap',
    preload: true,
});
exports.crenzo = (0, local_1.default)({
    src: [
        {
            path: '../public/fonts/CRENZO/CRENZO.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-crenzo',
    display: 'swap',
    preload: true,
});
exports.baunk = (0, local_1.default)({
    src: [
        {
            path: '../public/fonts/BAUNK FILE/Baunk.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-baunk',
    display: 'swap',
    preload: true,
});
