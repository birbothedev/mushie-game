import { getCurrentTile, getPlayer, tileMap, getKey } from "../mainScript.js";
import { resetGame } from "../util/util.js";

export function doDamageToPlayer(player){
    const currentTile = getCurrentTile();
    const key = getKey(currentTile);
    const tileData = tileMap.get(key);

    if (tileData?.hasDanger){
        player.takeDamage(20);
    }

    if (player.getHealth() <= 0){
        playerDeath();
    }

    updatePlayerHealthText();
    //removing of danger and currency is done in tileEvents
}

function playerDeath(){
    resetGame();
}

export function giveCurrencyToPlayer(player){
    const currentTile = getCurrentTile();
    const key = getKey(currentTile);
    const tileData = tileMap.get(key);

    if (tileData?.hasCurrency){
        player.addCurrency(1);
    }

    updateCurrencyText();
}

export function updateCurrencyText(){
    const playerCurrencyValue = document.getElementById("playerCurrencyValue");
    playerCurrencyValue.innerText = getPlayer().getCurrency();
}

export function updatePlayerHealthText(){
    const playerHealthValue = document.getElementById("playerHealthValue");
    playerHealthValue.innerText = getPlayer().getHealth();
}