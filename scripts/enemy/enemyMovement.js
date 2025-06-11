import { removeOldEnemyImageAndAddNew } from "../tiles/tileImageEvents.js";
import { findDistanceBetweenTiles, getAllTiles } from "../tiles/tileLogic.js";
import { tileMap } from "../mainScript.js";

export function moveEnemyCloserToPlayer(enemy, playerTile) {
    const enemyTile = getEnemyTile();
    const ex = parseInt(enemyTile.dataset.x);
    const ey = parseInt(enemyTile.dataset.y);

    const px = parseInt(playerTile.dataset.x);
    const py = parseInt(playerTile.dataset.y);

    let newX = ex;
    let newY = ey;

    const dx = px - ex;
    const dy = py - ey;

    if (Math.abs(dx) > Math.abs(dy)) {
        newX += dx > 0 ? 1 : -1;
    } else if (dy !== 0) {
        newY += dy > 0 ? 1 : -1;
    } else if (dx !== 0) {
        newX += dx > 0 ? 1 : -1;
    }

    const currentKey = `${ex},${ey}`;
    const newKey = `${newX},${newY}`;
    const currentTileData = tileMap.get(currentKey);
    const newTileData = tileMap.get(newKey);

    if (newTileData && newTileData.domRef) {
        // Update tileMap flags
        currentTileData.hasEnemy = false;
        newTileData.hasEnemy = true;

        // Update enemy's internal position
        enemy.setX(newX);
        enemy.setY(newY);

        const distanceList = findDistanceBetweenTiles(playerTile, newTileData.domRef);
        enemy.setDistance(distanceList[2]);

        removeOldEnemyImageAndAddNew(currentTileData.domRef, newTileData.domRef);
    }
}

export function getEnemyTile() {
    for (const [key, data] of tileMap.entries()) {
        if (data.hasEnemy) return data.domRef;
    }
    return null;
}
