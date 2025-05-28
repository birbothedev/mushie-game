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