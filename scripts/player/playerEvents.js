import { Player } from "../classes/player.js";
import { getCurrentTile } from "../mainScript.js";
import { resetGame } from "../util/util.js";

export function doDamageToPlayer(player){
    const currentTile = getCurrentTile();

    if (currentTile.classList.contains("hasDanger")){
        player.takeDamage(20);
    }
    console.log("Player health: ", player.getHealth());

    if (player.getHealth() <= 0){
        playerDeath();
    }
}

function playerDeath(){
    resetGame();
}