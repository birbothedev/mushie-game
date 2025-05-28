import { buyLevel } from "./shop.js";

export function resetGame(){
    return;
}

export function listenForButtonClicks(){
    const buyButton = document.getElementById("buyButton");
    buyButton.addEventListener('click', function(){
        buyLevel();
    });
}