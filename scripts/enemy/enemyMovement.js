
import { removeOldEnemyImageAndAddNew } from "../tiles/tileImageEvents.js";
import { findDistanceBetweenTiles, getAllTiles } from "../tiles/tileLogic.js";

export function moveEnemyCloserToPlayer(enemy, playerTile){
    const enemyTile = getEnemyTile();
    const ex = parseInt(enemyTile.dataset.x);
    const ey = parseInt(enemyTile.dataset.y);
    const px = parseInt(playerTile.dataset.x);
    const py = parseInt(playerTile.dataset.y);

    let newX = ex;
    let newY = ey;

    const dx = px - ex;
    const dy = py - ey;
    
    // Move along the axis with the greater difference
    if (Math.abs(dx) > Math.abs(dy)) {
        // if player is to the right of enemy move right else move left
        // condition ? valueIfTrue : valueIfFalse;
        newX += dx > 0 ? 1 : -1;
    } else if (dy !== 0) {
        newY += dy > 0 ? 1 : -1;
    } else if (dx !== 0) {
        // If dy is 0 but dx isn't, move along x
        newX += dx > 0 ? 1 : -1;
    }

    // find the new tile to move the enemy to
    const newTile = getAllTiles().find(tile => 
        parseInt(tile.dataset.x) === newX && parseInt(tile.dataset.y) === newY
    );

    if (newTile) {
        // move class from old tile to new tile
        enemyTile.classList.remove('hasEnemy');
        newTile.classList.add('hasEnemy');

        enemy.setX(newX);
        enemy.setY(newY);

        const distanceList = findDistanceBetweenTiles(playerTile, newTile);
        enemy.setDistance(distanceList[2]);
        console.log("Enemy moved to:", newX, newY, "New Distance:", distanceList[2]);

        removeOldEnemyImageAndAddNew(enemyTile, newTile);
    }
}

export function getEnemyTile(){
    let enemyTile;
    getAllTiles().forEach(tile => {
        if (tile.classList.contains('hasEnemy')){
            enemyTile = tile;
        }
    });

    return enemyTile;
}