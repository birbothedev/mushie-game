import { getCurrentTile } from "../mainScript.js";
import { findDistanceBetweenTiles, getAllTiles } from "../tiles/tileLogic.js";

export function moveEnemyCloserToPlayer(currentTile){
    const distance = findDistanceBetweenTiles(currentTile, getEnemyTile());

}

export function getEnemyTile(){
    let enemyTile;
    getAllTiles().forEach(tile => {
        if (tile.querySelector('.hasEnemy')){
            enemyTile = tile;
        }
    });
    return enemyTile;
}