import { replaceRow } from "../tiles/tileEvents.js";

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
    tile.appendChild(playerImage);

    const row = parseInt(tile.dataset.x);
    if (row === 6){
        replaceRow();
    }
}