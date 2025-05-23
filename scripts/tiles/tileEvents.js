import {  getAllTiles, isAdjacent } from "./tileLogic.js";
import { loopThroughTiles, 
    addCurrencyToTile, addDangerToTile, toggleImageVisibility,
    shuffleTiles } from "./tileLogic.js";
import { getCurrentTile, getSpawnTile, setCurrentTile } from "../mainScript.js";
import { createCurrencyImage, createDangerTileImage } from "./tileImageEvents.js";
import { spawnOrMovePlayer } from "../player/movement.js";

export function spawnDangerAndCurrency(row, validTilesINT){
    // TODO ADD TILE.HASCHILDNODES() CHECK AFTER REMOVING NUMBERS FROM DIVS
    const validTiles = Array.from(row).filter(tile => tile !== getCurrentTile() && !tile.hasChildNodes());

    // Ensure there are at least the given number of valid tiles
    if (validTiles.length < validTilesINT) {
        console.warn("Not enough valid tiles to spawn 10 danger and 10 petal tiles.");
        return;
    }

    shuffleTiles(validTiles);

    const dangerCount = Math.floor(validTilesINT / 2);
    const currencyCount = Math.round(Math.floor(validTilesINT / 4))

    // First danger then currency
    for (let i = 0; i < dangerCount; i++) {
        const tile = validTiles[i];
        createDangerTileImage(tile);
        addDangerToTile(tile);
        // toggleImageVisibility(dangerImage, tile);
    }

    for (let i = dangerCount; i < validTilesINT - currencyCount; i++) {
        const tile = validTiles[i];
        createCurrencyImage(tile);
        addCurrencyToTile(tile);
        // toggleImageVisibility(petalImage, tile);
    }
}


export function replaceRow(){
    console.log("Replacing row 6");
    let tileCount = 0;

    // Remove all row1 tiles
    let row1tiles = document.querySelectorAll('.row1');
    row1tiles.forEach(tile => tile.remove());
    
    // Shift all tiles up by 1 row
    getAllTiles().forEach(tile => {
        tileCount ++;
        let currentX = parseInt(tile.dataset.x);
        if (currentX > 1) {
            tile.dataset.x = currentX - 1;
            tile.classList.remove(`row${currentX}`);
            tile.classList.add(`row${currentX - 1}`);
            tile.id = `tile${tileCount - 1}`;
        }
    });

    // Add a new row at the bottom (row6)
    const gridContainer = document.getElementById('gameContainer');

    for (let i = 1; i <= 5; i++) {
        const newTile = document.createElement('div');
        newTile.classList.add('tiles', 'row6');
        newTile.id = `tile${document.querySelectorAll('.tiles').length + 1}`;
        newTile.dataset.x = 6;
        newTile.dataset.y = i;

        gridContainer.appendChild(newTile);
    }

    let row6tiles = document.querySelectorAll('.row6');
    spawnDangerAndCurrency(Array.from(row6tiles), 2);
    loopThroughTiles({ getCurrentTile, setCurrentTile }); 

}

export function removeDangerOrCurrencyFromTile(tile){
    const image = tile.querySelector('.tile-image');

    if (tile.classList.contains('hasDanger')){
        tile.classList.remove('hasDanger');
        if (image){
            tile.removeChild(image);
        }
    } else if (tile.classList.contains('hasCurrency')){
        tile.classList.remove('hasCurrency');
        if (image){
            tile.removeChild(image);
        }
    }
}