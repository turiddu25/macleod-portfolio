# Custom Fonts

Drop your custom font files in this directory. Supported formats:
- `.woff2` (preferred - best compression)
- `.woff` (good fallback)
- `.ttf` (larger file size)
- `.otf` (for OpenType fonts)

## Usage

1. Place your font files in this directory
2. Update the font family name in `app/fonts.css` 
3. The font will automatically be available as the default font for your project

## Example file structure:
```
public/fonts/
├── MyCustomFont-Regular.woff2
├── MyCustomFont-Bold.woff2
├── MyCustomFont-Italic.woff2
└── MyCustomFont-BoldItalic.woff2
```
