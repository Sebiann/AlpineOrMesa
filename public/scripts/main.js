import { biomeTwo, biomeThree, wordIndex, updateTimer } from './biomes.js';

// --- Set Biome and Background ---
document.getElementById("biomeTitle").textContent = biomeTwo[1] + " and " + biomeThree[wordIndex];
document.getElementById("pageTitle").textContent = "It is " + biomeTwo[1] + " and " + biomeThree[wordIndex] + "!";

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second