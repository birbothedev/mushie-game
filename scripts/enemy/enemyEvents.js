import { getAllTiles, isAdjacent, shuffleTiles } from "../tiles/tileLogic.js";
import { getCurrentTile, setEnemy, getKey, tileMap } from "../mainScript.js";
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

    addEnemyToNewTile(tile);
}

export function addEnemyToNewTile(tile){
    for (const [key, data] of tileMap.entries()) {
        if (data.hasEnemy) {
            data.hasEnemy = false;
            if (data.domRef) {
                const existingEnemy = data.domRef.querySelector(".enemy");
                if (existingEnemy) {
                    existingEnemy.remove();
                }
            }
        }
    }

    const key = getKey(tile);
    const tileData = tileMap.get(key);

    if (tileData) {
        tileData.hasEnemy = true;
    }

    createNewEnemyImage(tile);
}
