import { biomeVariations, index, updateTimer } from './biomes.js';

// --- Set Biome and Background ---
document.getElementById("biomeTitle").textContent = biomeVariations[index].slice(0,1) + " and " + biomeVariations[index].slice(1,2);
document.getElementById("pageTitle").textContent = "It is " + biomeVariations[index].slice(0,1) + " and " + biomeVariations[index].slice(1,2) + "!";

updateTimer(); // initial call
setInterval(updateTimer, 1000); // update every second