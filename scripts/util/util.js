import { buyLevel, unlockFreezeEnemy } from "./shop.js";

export function resetGame(){
    return;
}

export function listenForButtonClicks(){
    const buyLevelButton = document.getElementById("buyLevelButton");
    buyLevelButton.addEventListener('click', function(){
        buyLevel();
    });

    const buyFreezeButton = document.getElementById("buyFreezeButton");
    buyFreezeButton.addEventListener('click', function(){
        unlockFreezeEnemy();
    });
}
