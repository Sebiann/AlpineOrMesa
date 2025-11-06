import { biomeTwo, biomeThree, wordIndex, updateTimer } from './biomes.js';

// --- Set Biome and Background ---
document.getElementById("biomeTitle").textContent = biomeTwo[wordIndex] + " and " + biomeThree[wordIndex];
document.getElementById("pageTitle").textContent = "It is " + biomeTwo[wordIndex] + " and " + biomeThree[wordIndex] + "!";

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second