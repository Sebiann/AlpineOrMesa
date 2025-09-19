import { shoreImages, tropicsImages, alpineImages, mesaImages, calderaImages, kilnImages, wordIndex } from './biomes.js';
import { shoreText, tropicsText, alpineText, mesaText, calderaText, kilnText } from './biomes.js';


// --- Gallery ---
let currentBiome = null;
const galleryButtons = document.querySelectorAll(".selector");
galleryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const biome = button.id.replace("Selector", "");
        currentBiome = biome;
        replaceImages(biome);
    });
});

function replaceImages(biome) {
    currentBiome = biome;
    let images = [];
    if (biome === "shore") {
        images = shoreImages;
    } else if (biome === "alpine") {
        images = alpineImages;
    } else if (biome === "mesa") {
        images = mesaImages;
    } else if (biome === "caldera") {
        images = calderaImages;
    } else if (biome === "kiln") {
        images = kilnImages;
    } else if (biome === "tropics") {
        images = tropicsImages;
    }

    const galleryContainer = document.querySelector(".galleryContainer");
    galleryContainer.innerHTML = ""; // Clear existing images

    images.forEach((imgUrl, idx) => {
        const img = document.createElement("img");
        img.className = "galleryImage";
        img.src = imgUrl.replace(/^url\(['"]?(.+?)['"]?\)$/,'$1');
        img.dataset.index = idx;
        img.addEventListener("click", () => {
            // Remove bigImage from any other image and toggle
            if (img.classList.contains("bigImage")) {
                img.classList.remove("bigImage");
                removeBigImageLabel();
            } else {
                document.querySelectorAll('.bigImage').forEach(el => el.classList.remove('bigImage'));
                img.classList.add("bigImage");
                showBigImageLabel(idx, currentBiome);
            }
            updateNavButtons();
        });
        galleryContainer.appendChild(img);
    });
    // Remove label if no image is zoomed
    removeBigImageLabel();
    // Update nav buttons on image change
    updateNavButtons();
}

// Show label for zoomed image
function showBigImageLabel(idx, biome) {
    removeBigImageLabel();
    const label = document.createElement('div');
    label.className = 'bigImageLabel';
    if (biome === "alpine") label.textContent = alpineText[idx];
    else if (biome === "mesa") label.textContent = mesaText[idx];
    else if (biome === "caldera") label.textContent = calderaText[idx];
    else if (biome === "kiln") label.textContent = kilnText[idx];
    else if (biome === "shore") label.textContent = shoreText[idx];
    else if (biome === "tropics") label.textContent = tropicsText[idx];
    document.body.appendChild(label);
}

function removeBigImageLabel() {
    document.querySelectorAll('.bigImageLabel').forEach(el => el.remove());
}

// Show/hide left/right buttons based on fullscreen image position
function updateNavButtons() {
    const bigImg = document.querySelector('.bigImage');
    const leftButton = document.querySelector('.leftButton');
    const rightButton = document.querySelector('.rightButton');
    const galleryImages = document.querySelectorAll('.galleryImage');
    if (!bigImg) {
        leftButton.classList.add('hiddenNavButton');
        rightButton.classList.add('hiddenNavButton');
        removeBigImageLabel();
        return;
    }
    // Always show buttons when an image is fullscreen
    leftButton.classList.remove('hiddenNavButton');
    rightButton.classList.remove('hiddenNavButton');
    // Update label to match current big image
    showBigImageLabel(parseInt(bigImg.dataset.index), currentBiome);
}

// Left and right button navigation for bigImage
const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

function navigateGallery(direction) {
    const galleryContainer = document.querySelector(".galleryContainer");
    const bigImg = document.querySelector('.bigImage');
    if (!bigImg) return;
    let idx = parseInt(bigImg.dataset.index);
    let target;
    const total = galleryContainer.querySelectorAll('.galleryImage').length;
    if (direction === "right") {
        let nextIdx = idx + 1;
        if (nextIdx >= total) nextIdx = 0; // wrap to first
        target = galleryContainer.querySelector(`[data-index='${nextIdx}']`);
    } else if (direction === "left") {
        let prevIdx = idx - 1;
        if (prevIdx < 0) prevIdx = total - 1; // wrap to last
        target = galleryContainer.querySelector(`[data-index='${prevIdx}']`);
    }
    if (target) {
        bigImg.classList.remove('bigImage');
        target.classList.add('bigImage');
        // Show label for new zoomed image
        showBigImageLabel(parseInt(target.dataset.index), currentBiome);
    }
}

leftButton.addEventListener("click", () => {
    navigateGallery("left");
    updateNavButtons();
});

rightButton.addEventListener("click", () => {
    navigateGallery("right");
    updateNavButtons();
});

// Load initial biome images
if (wordIndex === 0) {
    // Alpine day
    currentBiome = "alpine";
    replaceImages("alpine");
} else if (wordIndex === 1) {
    // Mesa day
    currentBiome = "mesa";
    replaceImages("mesa");
}
// Initial nav button state
updateNavButtons();