const words = ["Alpine", "Mesa"];
const alpineImages = [
    "url('public/alpine/1.jpg')",
    "url('public/alpine/2.jpg')",
    "url('public/alpine/3.jpg')",
    "url('public/alpine/4.jpg')"
];
const mesaImages = [
    "url('public/mesa/1.jpg')",
    "url('public/mesa/2.jpg')"
];

// Reference date
// Map was bumped ahead Sept 7, 25
// And bumped back a day later
const referenceDate = new Date("2025-09-02T17:00:00Z");
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
const wordIndex = daysPassed % 2;

document.getElementById("word").textContent = words[wordIndex];
if (wordIndex === 0) {
    // Alpine day
    const randomAlpine = alpineImages[Math.floor(Math.random() * alpineImages.length)];
    document.body.style.backgroundImage = randomAlpine;
} else {
    // Mesa day
    const randomMesa = mesaImages[Math.floor(Math.random() * mesaImages.length)];
    document.body.style.backgroundImage = randomMesa;
}

// --- Countdown Timer ---
const timerElement = document.getElementById("timer");

function updateTimer() {
    const now = new Date();

    // Next switch is today 19:00 or tomorrow if passed
    let nextSwitch = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
    if (now >= nextSwitch) {
        nextSwitch.setDate(nextSwitch.getDate() + 1);
    }
    const diffMs = nextSwitch - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    timerElement.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second
