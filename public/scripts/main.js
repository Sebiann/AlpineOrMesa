import { biomeThree, wordIndex, updateTimer } from './biomes.js';

// --- Set Biome and Background ---
document.getElementById("biomeThreeTitle").textContent = biomeThree[wordIndex];
document.getElementById("pageTitle").textContent = "It is " + biomeThree[wordIndex] + "!";

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second