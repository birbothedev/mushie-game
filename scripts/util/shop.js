import { getPlayer } from "../mainScript.js";
import { updateCurrencyText } from "../player/playerEvents.js";
import { advanceLevel } from "./levelTracker.js";

export function buyLevel(){
    const currentCurrency = getPlayer().getCurrency();

    if (currentCurrency < 5){
        console.log("Not enough currency!");
    } else {
        advanceLevel();
        subtractCurrency(5);
    }
}

function subtractCurrency(int){
    let currentCurrency = getPlayer().getCurrency();

    currentCurrency -= int;
    getPlayer().setCurrency(currentCurrency);
    updateCurrencyText();
}

function unlockDiagonalMove(){
    // TODO unlock ability to move diagonally
}

function unlockGridVisibility(){
    // TODO unlock ability to see full 3x3 grid around player
}

function unlockFreezeEnemy(){
    // TODO unlock ability to freeze enemy on tile
}

function buyHealth(){
    // TODO buy health to heal player in various amounts (20, 60, 100)
}

// TODO add function to control inventory so player can store items
// TODO ^ rather than using them instantly upon purchase