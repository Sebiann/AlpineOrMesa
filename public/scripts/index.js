import { alpineImages, mesaImages, wordIndex } from './biomes.js';

const randomAlpineImage = alpineImages[Math.floor(Math.random() * alpineImages.length)];
const randomMesaImage = mesaImages[Math.floor(Math.random() * mesaImages.length)];

if (wordIndex === 0) {
    // Alpine day
    document.body.style.backgroundImage = randomAlpineImage;
} else if (wordIndex === 1) {
    // Mesa day
    document.body.style.backgroundImage = randomMesaImage;
}