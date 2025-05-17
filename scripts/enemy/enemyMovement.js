
import { findDistanceBetweenTiles, getAllTiles } from "../tiles/tileLogic.js";
import { styleStackedImage } from "../tiles/tileLogic.js";

export function moveEnemyCloserToPlayer(enemy, playerTile){
    const enemyTile = getEnemyTile();
    const ex = parseInt(enemyTile.dataset.x);
    const ey = parseInt(enemyTile.dataset.y);

    const px = parseInt(playerTile.dataset.x);
    const py = parseInt(playerTile.dataset.y);

    let newX = ex;
    let newY = ey;

    // decide movement priority
    if (ex !== px) {
        newX += px > ex ? 1 : -1; // move horizontally
    } else if (ey !== py) {
        newY += py > ey ? 1 : -1; // move vertically
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

        // move image from old tile to new tile
        const existingEnemy = document.querySelector("#enemyImage");
    
        if (existingEnemy) {
            enemyTile.removeChild(existingEnemy);
        }
    
        const enemyImage = document.createElement("img"); 
        enemyImage.src = `../images/blueTile.png`;
        enemyImage.alt = `enemy image`;
        enemyImage.id = 'enemyImage';
        enemyImage.style.zIndex = 2;
        styleStackedImage(enemyImage);
        newTile.appendChild(enemyImage);
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