# BrowserBible v3

Bible software that runs in the browser. See `changelog.md` for recent updates.

## Building Texts

Before BrowserBible is ready for deployment, the texts that will be deployed with it must be built.  To build texts, first install the dependencies:

	npm install

and then run:

	npm run build:content

This will read the texts data from `input/` and build the files that BrowserBible will use to show and search texts and place them in `app/content/texts/`.

## Adding Bibles and other Texts

To add texts:

1. Create a folder under `input/MyNewVersion/`
2. Create a `info.json` file in that folder with the id, name, language, information.
3. Put content in the folder (currently USFM files and bibles from http://unbound.biola.edu/)
4. Run `npm run build:content`

### Build (minify) ###

To create a "build" version, you'll need uglify-js

1. Install dependencies (if you haven't already): `npm install`
2. Copy `app/js/core/config-custom-example.js` to `config-custom.js` and modify to your needs.
3. Run `npm run build` (creates build files to use with index-build.html)

## Adding Translations

1. Copy one of the resource files under `src/resources` to a new file named with the 2-character ISO code for your target new language.
2. Replace the translations in this new resource file with your own for the new translation.
3. Run `npm run build:languageindex` and then `npm run build`. Your new translation should be integrated into the code.
