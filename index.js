const words = ["Alpine", "Mesa"];
const backgrounds = [
    "url('alpine.jpg')",  // replace with your Alpine image
    "url('mesa.jpg')"     // replace with your Mesa image
];

// Reference date
const referenceDate = new Date("2025-09-02T17:00:00Z");
const now = new Date();

const msPerDay = 24 * 60 * 60 * 1000;
const daysPassed = Math.floor((now - referenceDate) / msPerDay);
const wordIndex = daysPassed % 2;

document.getElementById("word").textContent = words[wordIndex];
document.body.style.backgroundImage = backgrounds[wordIndex];

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
