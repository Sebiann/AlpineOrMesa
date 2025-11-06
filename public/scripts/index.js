import { tropicsImages, rootsImages, alpineImages, mesaImages, wordIndex } from './biomes.js';

function getRandomImage(imageArray) {
    return imageArray[Math.floor(Math.random() * imageArray.length)];
}

var biome = 3;

function setBackground(img) {
    if (!img) return;
    if (typeof img === 'string' && img.trim().startsWith('url(')) {
        document.body.style.backgroundImage = img;
    } else {
        document.body.style.backgroundImage = `url("${img}")`;
    }
}

if (wordIndex === 0 && biome === 3) {
    // Alpine day
    setBackground(getRandomImage(alpineImages));
} else if (wordIndex === 1 && biome === 3) {
    // Mesa day
    setBackground(getRandomImage(mesaImages));
}

function toggleBiome() {
    console.log("Toggling biome");
    if (biome === 3) {
        // Switch to biomeTwo
        biome = 2;
        console.log("Switched to biomeTwo");
        if (wordIndex === 0) {
            // Tropics
            setBackground(getRandomImage(tropicsImages));
        } else if (wordIndex === 1) {
            // Roots
            setBackground(getRandomImage(rootsImages));
        }
    } else {
        // Switch to biomeThree
        biome = 3;
        console.log("Switched to biomeThree");
        if (wordIndex === 0) {
            // Alpine
            setBackground(getRandomImage(alpineImages));
        } else if (wordIndex === 1) {
            // Mesa
            setBackground(getRandomImage(mesaImages));
        }
    }
}

const toggleButton = document.querySelector("#toggleButton");

// Manual toggle on button click
toggleButton.addEventListener("click", toggleBiome);

// Auto-toggle every 10 seconds
setInterval(toggleBiome, 10000);