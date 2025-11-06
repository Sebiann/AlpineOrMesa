import { tropicsImages, rootsImages, alpineImages, mesaImages, wordIndex } from './biomes.js';

const randomAlpineImage = alpineImages[Math.floor(Math.random() * alpineImages.length)];
const randomMesaImage = mesaImages[Math.floor(Math.random() * mesaImages.length)];
const randomTropicsImage = tropicsImages[Math.floor(Math.random() * tropicsImages.length)];
const randomRootsImage = rootsImages[Math.floor(Math.random() * rootsImages.length)];

var biome = 3;

if (wordIndex === 0 && biome === 3) {
    // Alpine day
    document.body.style.backgroundImage = randomAlpineImage;
} else if (wordIndex === 1 && biome === 3) {
    // Mesa day
    document.body.style.backgroundImage = randomMesaImage;
}

const toggleButton = document.querySelector(".toggleButton");

toggleButton.addEventListener("click", () => {
    if (biome === 3) {
        // Switch to biomeTwo
        biome = 2;
        if (wordIndex === 0) {
            // Tropics
            document.body.style.backgroundImage = randomTropicsImage;
        } else if (wordIndex === 1) {
            // Roots
            document.body.style.backgroundImage = randomRootsImage;
        }
    } else {
        // Switch to biomeThree
        biome = 3;
        if (wordIndex === 0) {
            // Alpine
            document.body.style.backgroundImage = randomAlpineImage;
        } else if (wordIndex === 1) {
            // Mesa
            document.body.style.backgroundImage = randomMesaImage;
        }
    }
});