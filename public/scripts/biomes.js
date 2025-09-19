export const biomeThree = ["Alpine", "Mesa"];

export const shoreImages = [
    "url('public/biomes/shore/1.png')",
    "url('public/biomes/shore/2.jpg')",
    "url('public/biomes/shore/3.jpg')",
    "url('public/biomes/shore/original-4.jpg')",
    "url('public/biomes/shore/5.jpg')"
];
export const shoreText = [
    "#1 Everyone died here",
    "#2 THE Canon-event",
    "#3 [INSERT TEXT HERE]",
    "#4 [INSERT TEXT HERE]",
    "#5 [INSERT TEXT HERE]"
];

export const tropicsImages = [
    "url('public/biomes/tropics/1.jpg')",
    "url('public/biomes/tropics/2.png')",
    "url('public/biomes/tropics/3.png')"
];
export const tropicsText = [
    "#1 Astronaut dead",
    "#2 Suitcase",
    "#3 BTS"
];

export const alpineImages = [
    "url('public/biomes/alpine/1.jpg')",
    "url('public/biomes/alpine/2.jpg')",
    "url('public/biomes/alpine/3.jpg')",
    "url('public/biomes/alpine/4.jpg')"
];
export const alpineText = [
    "#1 Capybara",
    "#2 Canon fail",
    "#3 Spooky",
    "#4 Don't slip"
];

export const mesaImages = [
    "url('public/biomes/mesa/1.jpg')",
    "url('public/biomes/mesa/2.jpg')",
    "url('public/biomes/mesa/3.jpg')",
    "url('public/biomes/mesa/4.jpg')",
    "url('public/biomes/mesa/5.jpg')"
];
export const mesaText = [
    "#1 falling, or not falling",
    "#2 Run boy run",
    "#3 hehehehehehe",
    "#4 Smile and wave boys",
    "#5 Death in mids of the balls"
];

export const calderaImages = [
    "url('public/biomes/caldera/1.jpg')"
];
export const calderaText = [
    "#1 Fly hacks"
];

export const kilnImages = [
    "url('public/biomes/kiln/1.jpg')",
    "url('public/biomes/kiln/2.jpg')",
    "url('public/biomes/kiln/3.jpg')"
];
export const kilnText = [
    "#1 Magma Boy",
    "#2 More throw than faith",
    "#3 Salute Soldier"
];

// Reference date UTC
const resetTimeHour = 17;
const resetTimeMinute = 0;
const referenceDate = new Date(Date.UTC(2025, 8, 3, resetTimeHour, resetTimeMinute, 0)); // Month is 0-indexed
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
export const wordIndex = daysPassed % 2;

// --- Countdown Timer ---
const timerElement = document.getElementById("resetTimer");

export function updateTimer() {
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