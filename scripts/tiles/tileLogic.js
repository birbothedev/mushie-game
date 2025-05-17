import { spawnOrMovePlayer, addPlayerToNewTile, removePlayerFromOldTile } from "../player/movement.js";
import { getCurrentTile, setCurrentTile, getPlayer, getEnemy } from "../mainScript.js";
import { doDamageToPlayer, giveCurrencyToPlayer } from "../player/playerEvents.js";
import { removeDangerOrCurrencyFromTile } from "./tileEvents.js";
import { moveEnemyCloserToPlayer } from "../enemy/enemyMovement.js";

export function isAdjacent(t1, t2){
    const x1 = parseInt(t1.dataset.x);
    const y1 = parseInt(t1.dataset.y);
    const x2 = parseInt(t2.dataset.x);
    const y2 = parseInt(t2.dataset.y);

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (dx + dy === 1);
}

export function findDistanceBetweenTiles(t1, t2){
    const list = [];
    const x1 = parseInt(t1.dataset.x);
    const y1 = parseInt(t1.dataset.y);
    const x2 = parseInt(t2.dataset.x);
    const y2 = parseInt(t2.dataset.y);

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    const distance = dx + dy;

    list.push(dx);
    list.push(dy);
    list.push(distance);

    return list;
}

export function getAdjacentTiles(clickedTile){
    const adjacentTilesList = [];
    getAllTiles().forEach(tile => {
        if (isAdjacent(tile, clickedTile)){
            adjacentTilesList.push(tile);
        }
    });
    return adjacentTilesList;
}

export function getAllTiles() {
    return Array.from(document.querySelectorAll('.tiles'));
}

export function getTileImage(tile){
    return tile.querySelector('.tile-image');
}

export function loopThroughTiles({ getCurrentTile, setCurrentTile }){
    const currentTiles = Array.from(document.querySelectorAll('.tiles'));

    currentTiles.forEach(tile => {
        tile.addEventListener('mouseover', () => {
            if (isAdjacent(getCurrentTile(), tile)) {
                tile.classList.add('adjacent');
                tile.classList.remove('not-adjacent');
            } else {
                tile.classList.add('not-adjacent');
                tile.classList.remove('adjacent');
            }
        });

        tile.addEventListener('mouseout', () => {
            tile.classList.remove('adjacent', 'not-adjacent');
        });

        tile.addEventListener('click', function(event){
            const clickedTile = event.target.closest('.tiles');
            const currentTile = getCurrentTile();
            removePlayerFromOldTile(currentTile);
            if (isAdjacent(getCurrentTile(), clickedTile)) {
                spawnOrMovePlayer(clickedTile);
                addPlayerToNewTile(clickedTile);
                setCurrentTile(clickedTile);
                doDamageToPlayer(getPlayer());
                giveCurrencyToPlayer(getPlayer());
                removeDangerOrCurrencyFromTile(clickedTile);
                moveEnemyCloserToPlayer(getEnemy(), clickedTile);
                // // hide all tile images
                // getAllTiles().forEach(tile => {
                //     const image = getTileImage(tile);
                //     if (image) image.style.visibility = 'hidden';
                // });

                // // show only those adjacent to the new tile
                // getAdjacentTiles(clickedTile).forEach(adjTile => {
                //     const image = getTileImage(adjTile);
                //     if (image) image.style.visibility = 'visible';
                // });
            }
        });
    });
}

export function addDangerToTile(tile){
    tile.classList.add('hasDanger');
}

export function addCurrencyToTile(tile){
    tile.classList.add('hasCurrency');
}

export function toggleImageVisibility(image, tile){
    if (!image) {
        console.warn("toggleImageVisibility: image is null for tile:", tile);
        return;
    }
    if (!isAdjacent(tile, getCurrentTile())){
        image.style.visibility = 'hidden';
    } else {
        image.style.visibility = 'visible';
    }
}

export function shuffleTiles(validTilesArray){
    // Shuffle the valid tiles
    for (let i = validTilesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validTilesArray[i], validTilesArray[j]] = [validTilesArray[j], validTilesArray[i]];
    }
}