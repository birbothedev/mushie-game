import { replaceRow } from "../tiles/tileEvents.js";
import { createNewPlayerImage } from "../tiles/tileImageEvents.js";

export function spawnOrMovePlayer(tile){
    // check if player image exists, if so remove it
    const existingPlayer = document.querySelector("#playerImage");

    if (existingPlayer) {
    existingPlayer.remove();
    }

    createNewPlayerImage(tile);
    addPlayerToNewTile(tile);

    const row = parseInt(tile.dataset.x);
    if (row === 6){
        setTimeout(function() {
            replaceRow();
        }, 500);
    }
}

export function addPlayerToNewTile(tile){
    tile.classList.add('hasPlayer');
}

export function removePlayerFromOldTile(tile){
    tile.classList.remove('hasPlayer');
}