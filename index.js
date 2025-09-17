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
    "url('public/biomes/mesa/2.jpg')",
    "url('public/biomes/mesa/3.jpg')",
    "url('public/biomes/mesa/4.jpg')",
    "url('public/biomes/mesa/5.jpg')"
];
const calderaImages = [
    "url('public/biomes/kiln/1.jpg')"
];
const kilnImages = [
    "url('public/biomes/kiln/1.jpg')"
];
const randomShoreImage = shoreImages[Math.floor(Math.random() * shoreImages.length)];
const randomAlpineImage = alpineImages[Math.floor(Math.random() * alpineImages.length)];
const randomMesaImage = mesaImages[Math.floor(Math.random() * mesaImages.length)];
const randomCalderaImage = calderaImages[Math.floor(Math.random() * calderaImages.length)]
const randomKilnImage = kilnImages[Math.floor(Math.random() * kilnImages.length)];

// Reference date UTC
const resetTimeHour = 17;
const resetTimeMinute = 0;
const referenceDate = new Date(Date.UTC(2025, 8, 3, resetTimeHour, resetTimeMinute, 0)); // Month is 0-indexed
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
const wordIndex = daysPassed % 2;

// --- Set Biome and Background ---
document.getElementById("biomeThreeTitle").textContent = biomeThree[wordIndex];
document.getElementById("pageTitle").textContent = "It is " + biomeThree[wordIndex] + "!";
if (wordIndex === 0) {
    // Alpine day
    document.body.style.backgroundImage = randomAlpineImage;
} else if (wordIndex === 1) {
    // Mesa day
    document.body.style.backgroundImage = randomMesaImage;
}

// --- Countdown Timer ---
const timerElement = document.getElementById("resetTimer");

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
