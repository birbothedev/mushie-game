import { getAllTiles, isAdjacent, shuffleTiles } from "../tiles/tileLogic.js";
import { getCurrentTile, setEnemy } from "../mainScript.js";
import { createNewEnemyImage } from "../tiles/tileImageEvents.js";
import { Enemy } from "../classes/enemy.js";

export function spawnEnemy(){
    const enemy = new Enemy();
    setEnemy(enemy);
    const validTiles = Array.from(getAllTiles()).filter(tile => tile !== getCurrentTile() 
    && !tile.hasChildNodes() && !isAdjacent(tile, getCurrentTile()));

    shuffleTiles(validTiles);

    let i = Math.floor(Math.random() * (validTiles.length));
    const tile = validTiles[i];

    createNewEnemyImage(tile);
    addEnemyToNewTile(tile);
}

export function addEnemyToNewTile(tile){
    tile.classList.add('hasEnemy');
}
