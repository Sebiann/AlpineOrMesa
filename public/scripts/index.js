import { tropicsImages, rootsImages, alpineImages, mesaImages, index, biomeVariations } from './biomes.js';

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

if (biomeVariations[index].includes('alpine')) {
    // Alpine day
    setBackground(getRandomImage(alpineImages));
} else if (biomeVariations[index].includes('mesa')) {
    // Mesa day
    setBackground(getRandomImage(mesaImages));
}

function toggleBiome() {
    if (biome === 3) {
        // Switch to biomeTwo
        biome = 2;
        if (biomeVariations[index].includes('tropics')) {
            // Tropics
            setBackground(getRandomImage(tropicsImages));
        } else if (biomeVariations[index].includes('roots')) {
            // Roots
            setBackground(getRandomImage(rootsImages));
        }
    } else {
        // Switch to biomeThree
        biome = 3;
        if (biomeVariations[index].includes('alpine')) {
            // Alpine
            setBackground(getRandomImage(alpineImages));
        } else if (biomeVariations[index].includes('mesa')) {
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