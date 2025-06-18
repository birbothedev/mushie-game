import { getPlayer } from "../mainScript.js";
import { updateCurrencyText } from "../player/playerEvents.js";
import { createFreezeItemImage } from "../tiles/tileImageEvents.js";
import { listenForInventoryClicks } from "./inventory.js";
import { advanceLevel } from "./levelTracker.js";

function subtractCurrency(int){
    let currentCurrency = getPlayer().getCurrency();

    currentCurrency -= int;
    getPlayer().setCurrency(currentCurrency);
    updateCurrencyText();
}

export function buyLevel(){
    const currentCurrency = getPlayer().getCurrency();

    if (currentCurrency < 5){
        console.log("Not enough currency!");
    } else {
        advanceLevel();
        subtractCurrency(5);
    }
}

function unlockDiagonalMove(){
    // TODO unlock ability to move diagonally
}

function unlockGridVisibility(){
    // TODO unlock ability to see full 3x3 grid around player
}

export function unlockFreezeEnemy(){
    // TODO unlock ability to freeze enemy on tile
    const currentCurrency = getPlayer().getCurrency();

    if (currentCurrency < 3){
        console.log("Not enough currency!");
    } else {
        subtractCurrency(3);
        createFreezeItemImage();
        listenForInventoryClicks();
    }
}

function buyHealth(){
    // TODO buy health to heal player in various amounts (20, 60, 100)
}

export function toggleShopVisibility(button){
    // TODO button.style.visibility = hidden
}

// TODO add function to control inventory so player can store items
// TODO ^ rather than using them instantly upon purchase