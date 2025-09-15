const biomeThree = ["Alpine", "Mesa"];
const shoreImages = [
    "url('public/biomes/shore/1.jpg')"
];
const alpineImages = [
    "url('public/biomes/alpine/1.jpg')",
    "url('public/biomes/alpine/2.jpg')",
    "url('public/biomes/alpine/3.jpg')",
    "url('public/biomes/alpine/4.jpg')"
];
const mesaImages = [
    "url('public/biomes/mesa/1.jpg')",
    "url('public/biomes/mesa/2.jpg')"
];

// Reference date
// Map was bumped ahead Sept 7, 25
// And bumped back a day later
const referenceDate = new Date("2025-09-02T17:00:00Z");
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
const wordIndex = daysPassed % 2;

// --- Set Biome and Background ---
document.getElementById("word").textContent = biomeThree[wordIndex];
if (wordIndex === 0) {
    // Alpine day
    const randomAlpineImage = alpineImages[Math.floor(Math.random() * alpineImages.length)];
    document.body.style.backgroundImage = randomAlpineImage;
} else if (wordIndex === 1) {
    // Mesa day
    const randomMesaImage = mesaImages[Math.floor(Math.random() * mesaImages.length)];
    document.body.style.backgroundImage = randomMesaImage;
}

// --- Countdown Timer ---
const timerElement = document.getElementById("timer");

function updateTimer() {
    const now = new Date();
    // Calculate next switch at 17:00 UTC
    const utcYear = now.getUTCFullYear();
    const utcMonth = now.getUTCMonth();
    const utcDate = now.getUTCDate();
    let nextSwitchUTC = new Date(Date.UTC(utcYear, utcMonth, utcDate, 17, 0, 0));
    if (now >= nextSwitchUTC) {
        // If past 17:00 UTC, set to next day 17:00 UTC
        nextSwitchUTC = new Date(Date.UTC(utcYear, utcMonth, utcDate + 1, 17, 0, 0));
    }
    const diffMs = nextSwitchUTC - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    timerElement.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second
