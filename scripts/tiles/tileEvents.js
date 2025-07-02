import {  getAllTiles } from "./tileLogic.js";
import { loopThroughTiles, 
    addCurrencyToTile, addDangerToTile, toggleImageVisibility,
    shuffleTiles } from "./tileLogic.js";
import { getCurrentTile, getEnemy, getKey, setCurrentTile, tileMap } from "../mainScript.js";
import { updateEnemyTile } from "../enemy/enemyMovement.js";


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

    // If enemy still on map, update position
    if (getEnemy() && getEnemy().getX() !== -1) {
        getEnemy().setFrozenState(false);
        updateEnemyTile(getEnemy(), 3); // shift enemy position up by 3 rows
    }

    
}

export function spawnDangerAndCurrency(row, validTilesINT) {
    const validTiles = Array.from(row).filter(tile =>
        tile !== getCurrentTile() && !tile.hasChildNodes()
    );

    if (validTiles.length < validTilesINT) {
        console.warn("Not enough valid tiles to spawn 10 danger and 10 petal tiles.");
        return;
    }

    shuffleTiles(validTiles);

    const dangerCount = Math.floor(validTilesINT / 2);
    const currencyCount = Math.round(validTilesINT / 4);

    // Assign DANGER
    for (let i = 0; i < dangerCount; i++) {
        const tile = validTiles[i];
        const key = getKey(tile);
        const tileData = tileMap.get(key);
        if (tileData) {
            tileData.hasDanger = true;
            addDangerToTile(tile);
            // toggleImageVisibility(tile); 
        }
    }

    // Assign CURRENCY
    for (let i = dangerCount; i < dangerCount + currencyCount; i++) {
        const tile = validTiles[i];
        const key = getKey(tile);
        const tileData = tileMap.get(key);
        if (tileData) {
            tileData.hasCurrency = true;
            addCurrencyToTile(tile);
            // toggleImageVisibility(tile);
        }
    }
}

export function removeDangerOrCurrencyFromTile(tile) {
    const key = getKey(tile);
    const tileData = tileMap.get(key);
    const image = tile.querySelector('.tile-image');

    if (!tileData) return;

    if (tileData.hasDanger) {
        tileData.hasDanger = false;
        if (image) tile.removeChild(image);
    } else if (tileData.hasCurrency) {
        tileData.hasCurrency = false;
        if (image) tile.removeChild(image);
    }
}

function addNewRow(int) {
    const gridContainer = document.getElementById('gameContainer');

    for (let i = 1; i <= 5; i++) {
        const newTile = document.createElement('div');
        newTile.classList.add('tiles', `row${int}`);
        newTile.id = `tile${document.querySelectorAll('.tiles').length + 1}`;
        newTile.dataset.x = int;
        newTile.dataset.y = i;
        gridContainer.appendChild(newTile);

        const key = int + "," + i;
        tileMap.set(key, {
            visited: false,
            hasPlayer: false,
            hasDanger: false,
            hasCurrency: false,
            domRef: newTile
        });
    }

    let rowtiles = document.querySelectorAll(`.row${int}`);
    spawnDangerAndCurrency(Array.from(rowtiles), 2);
}