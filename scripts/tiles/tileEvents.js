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
    let row2tiles = document.querySelectorAll('.row2');
    row2tiles.forEach(tile => tile.remove());
    let row3tiles = document.querySelectorAll('.row3');
    row3tiles.forEach(tile => tile.remove());
    
    // Shift all tiles up by 1 row
    getAllTiles().forEach(tile => {
        tileCount ++;
        let currentX = parseInt(tile.dataset.x);
        if (currentX > 1) {
            tile.dataset.x = currentX - 3;
            tile.classList.remove(`row${currentX}`);
            tile.classList.add(`row${currentX - 3}`);
            tile.id = `tile${tileCount - 3}`;
        }
    });

    addNewRow(4);
    addNewRow(5);
    addNewRow(6);
    loopThroughTiles({ getCurrentTile, setCurrentTile }); 

}

function addNewRow(int){
    // Add a new rows at the bottom
    const gridContainer = document.getElementById('gameContainer');

    for (let i = 1; i <= 5; i++) {
        const newTile = document.createElement('div');
        newTile.classList.add('tiles', `row${int}`);
        newTile.id = `tile${document.querySelectorAll('.tiles').length + 1}`;
        newTile.dataset.x = int;
        newTile.dataset.y = i;
        gridContainer.appendChild(newTile);
    }
    let rowtiles = document.querySelectorAll(`.row${int}`);
    spawnDangerAndCurrency(Array.from(rowtiles), 2);
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