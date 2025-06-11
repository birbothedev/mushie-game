import { replaceRow } from "../tiles/tileEvents.js";
import { createNewPlayerImage } from "../tiles/tileImageEvents.js";
import { getKey, getCurrentTile, tileMap } from "../mainScript.js";

export function spawnOrMovePlayer(tile){
    // check if player image exists, if so remove it
    const existingPlayer = document.querySelector("#playerImage");

    if (existingPlayer) {
    existingPlayer.remove();
    }

    const key = getKey(tile);

    // Clear old player tile
    const oldTile = getCurrentTile();
    if (oldTile) {
        const oldKey = oldTile.dataset.x + "," + oldTile.dataset.y;
        if (tileMap.has(oldKey)) {
            tileMap.get(oldKey).hasPlayer = false;
        }
    }

    // Set new player tile
    if (tileMap.has(key)) {
        tileMap.get(key).hasPlayer = true;
    }

    createNewPlayerImage(tile);

    const row = parseInt(tile.dataset.x);
    if (row === 6){
        setTimeout(function() {
            replaceRow();
        }, 500);
    }
}

export function respawnPlayerAtTopRow(){
    
}