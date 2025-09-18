const biomeThree = ["Alpine", "Mesa"];
const shoreImages = [
    "url('public/biomes/shore/1.png')",
    "url('public/biomes/shore/original-2.jpg')",
    "url('public/biomes/shore/original-3.jpg')",
    "url('public/biomes/shore/original-4.jpg')",
    "url('public/biomes/shore/original-5.jpg')"
];
const alpineImages = [
    "url('public/biomes/alpine/1.jpg')",
    "url('public/biomes/alpine/2.jpg')",
    "url('public/biomes/alpine/3.jpg')",
    "url('public/biomes/alpine/4.jpg')"
];
const mesaImages = [
    "url('public/biomes/mesa/1.jpg')",
    "url('public/biomes/mesa/2.jpg')",
    "url('public/biomes/mesa/3.jpg')",
    "url('public/biomes/mesa/4.jpg')",
    "url('public/biomes/mesa/5.jpg')"
];
const calderaImages = [
    "url('public/biomes/kiln/1.jpg')"
];
const kilnImages = [
    "url('public/biomes/kiln/1.jpg')",
    "url('public/biomes/kiln/original-2.jpg')",
    "url('public/biomes/kiln/original-3.jpg')"
];
// Reference date UTC
const resetTimeHour = 17;
const resetTimeMinute = 0;
const referenceDate = new Date(Date.UTC(2025, 8, 3, resetTimeHour, resetTimeMinute, 0)); // Month is 0-indexed
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
const wordIndex = daysPassed % 2;

document.getElementById("biomeThreeTitleGallery").textContent = biomeThree[wordIndex] + "";
document.getElementById("pageTitle").textContent = "It is " + biomeThree[wordIndex] + "!";

// --- Gallery ---
const galleryButtons = document.querySelectorAll(".selector");
galleryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const biome = button.id.replace("Selector", "");
        replaceImages(biome);
    });
});

function replaceImages(biome) {
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
    }

    const galleryContainer = document.querySelector(".galleryContainer");
    galleryContainer.innerHTML = ""; // Clear existing images
    
    images.forEach((imgUrl, idx) => {
        const img = document.createElement("img");
        img.className = "galleryImage";
        img.src = imgUrl.replace(/^url\(['"]?(.+?)['"]?\)$/,'$1');
        img.dataset.index = idx;
        img.addEventListener("click", () => {
            img.classList.toggle("bigImage");
        });
        galleryContainer.appendChild(img);
    });
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
    if (direction === "right") {
        target = galleryContainer.querySelector(`[data-index='${idx+1}']`);
    } else if (direction === "left") {
        target = galleryContainer.querySelector(`[data-index='${idx-1}']`);
    }
    if (target) {
        bigImg.classList.remove('bigImage');
        target.classList.add('bigImage');
    }
}

leftButton.addEventListener("click", () => navigateGallery("left"));
rightButton.addEventListener("click", () => navigateGallery("right"));

// Load initial biome images
if (wordIndex === 0) {
    // Alpine day
    replaceImages("alpine");
} else if (wordIndex === 1) {
    // Mesa day
    replaceImages("mesa");
}

// --- Countdown Timer ---
const timerElement = document.getElementById("resetTimerGallery");

function updateTimer() {
    const now = new Date();
    // Calculate next switch at 17:00 UTC
    const utcYear = now.getUTCFullYear();
    const utcMonth = now.getUTCMonth();
    const utcDate = now.getUTCDate();
    let nextSwitchUTC = new Date(Date.UTC(utcYear, utcMonth, utcDate, resetTimeHour, resetTimeMinute, 0));
    if (now >= nextSwitchUTC) {
        // If past 17:00 UTC, set to next day 17:00 UTC
        nextSwitchUTC = new Date(Date.UTC(utcYear, utcMonth, utcDate + 1, resetTimeHour, resetTimeMinute, 0));
    }
    const diffMs = nextSwitchUTC - now;
    if (diffMs <= 1000) {
        // Timer hit zero, reload page
        location.reload();
        return;
    }
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    timerElement.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second