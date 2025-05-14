import { replaceRow } from "../tiles/tileEvents.js";
import { styleStackedImage } from "../tiles/tileLogic.js";

export function spawnOrMovePlayer(tile){
    // check if player image exists, if so remove it
    const existingPlayer = document.querySelector("#playerImage");

    if (existingPlayer) {
    existingPlayer.remove();
    }

    const playerImage = document.createElement("img"); 
    playerImage.src = `../images/player.png`;
    playerImage.alt = `player image`;
    playerImage.id = 'playerImage';
    playerImage.style.zIndex = 2;
    styleStackedImage(playerImage);
    tile.appendChild(playerImage);

    const row = parseInt(tile.dataset.x);
    if (row === 6){
        setTimeout(function() {
            replaceRow();
        }, 1000);
    }
}

export function addPlayerToNewTile(tile){
    tile.classList.add('hasPlayer');
}

export function removePlayerFromOldTile(tile){
    tile.classList.remove('hasPlayer');
}