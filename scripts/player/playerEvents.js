import { Player } from "../classes/player.js";
import { getCurrentTile } from "../mainScript.js";
import { resetGame } from "../util/util.js";

export function doDamageToPlayer(player){
    const currentTile = getCurrentTile();

    if (currentTile.classList.contains("hasDanger")){
        player.takeDamage(20);
    }

    if (player.getHealth() <= 0){
        playerDeath();
    }

    const playerHealthValue = document.getElementById("playerHealthValue");
    playerHealthValue.innerText = player.getHealth();
}

function playerDeath(){
    resetGame();
}

export function giveCurrencyToPlayer(player){
    const currentTile = getCurrentTile();

    if (currentTile.classList.contains("hasCurrency")){
        player.addCurrency(1);
    }

    const playerCurrencyValue = document.getElementById("playerCurrencyValue");
    playerCurrencyValue.innerText = player.getCurrency();
}