const fs = require('fs');
const sizeOf = require('image-size');

const PUBLIC_PATH = './public';
const BASE_PATH = '/img/events/';
const YEAR = 2023;

const photos = [];

fs.readdirSync(PUBLIC_PATH + BASE_PATH + YEAR).forEach((file) => {
    const dimensions = sizeOf(`${PUBLIC_PATH}${BASE_PATH}${YEAR}/${file}`);

    photos.push({
        src: `${BASE_PATH}${YEAR}/${file}`,
        width: dimensions.width,
        height: dimensions.height
    });
});

// very hacky
fs.writeFileSync(`./src/data/photos/photos${YEAR}.js`, `const photos = ${JSON.stringify(photos)};\n\nexport default photos;`);