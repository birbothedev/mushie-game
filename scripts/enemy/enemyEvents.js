import { getAllTiles, isAdjacent, shuffleTiles, styleStackedImage } from "../tiles/tileLogic.js";
import { getCurrentTile } from "../mainScript.js";

export function spawnEnemy(){
    const validTiles = Array.from(getAllTiles()).filter(tile => tile !== getCurrentTile() 
    && !tile.hasChildNodes() && !isAdjacent(tile, getCurrentTile()));

    shuffleTiles(validTiles);

    let i = Math.floor(Math.random() * (validTiles.length));
    const tile = validTiles[i];

    const enemyImage = document.createElement("img"); 
    enemyImage.src = `../images/blueTile.png`;
    enemyImage.alt = `enemy image`;
    enemyImage.id = 'enemyImage';
    enemyImage.style.zIndex = 1;
    styleStackedImage(enemyImage);
    tile.appendChild(enemyImage);
    addEnemyToNewTile(tile);
}

export function addEnemyToNewTile(tile){
    tile.classList.add('hasEnemy');
}
