
export function removeOldEnemyImageAndAddNew(existingtile, newtile){
    // move image from old tile to new tile
    const existingEnemy = document.querySelector("#enemyImage");

    if (existingEnemy) {
        existingtile.removeChild(existingEnemy);
    }

    const enemyImage = document.createElement("img"); 
    enemyImage.src = `/mushie-game/images/blueTile.png`;
    enemyImage.alt = `enemy image`;
    enemyImage.id = 'enemyImage';
    enemyImage.style.zIndex = 2;
    styleStackedImage(enemyImage);
    newtile.appendChild(enemyImage);
}

export function createNewEnemyImage(tile){
    const enemyImage = document.createElement("img"); 
    enemyImage.src = `images/blueTile.png`;
    enemyImage.alt = `enemy image`;
    enemyImage.id = 'enemyImage';
    enemyImage.style.zIndex = 1;
    styleStackedImage(enemyImage);
    tile.appendChild(enemyImage);
}

export function createNewPlayerImage(tile){
    const playerImage = document.createElement("img"); 
    playerImage.src = `images/player.png`;
    playerImage.alt = `player image`;
    playerImage.id = 'playerImage';
    playerImage.style.zIndex = 2;
    styleStackedImage(playerImage);
    tile.appendChild(playerImage);
}

export function createDangerTileImage(tile){
    const dangerImage = document.createElement("img");
    dangerImage.src = `images/dangerTile.png`;
    dangerImage.alt = `danger image`;
    dangerImage.classList.add('tile-image');
    dangerImage.style.zIndex = 1;
    styleStackedImage(dangerImage);
    tile.appendChild(dangerImage);
}

export function createCurrencyImage(tile){
    const petalImage = document.createElement("img"); 
    petalImage.src = `images/petalTile.png`;
    petalImage.alt = `petal image`;
    petalImage.classList.add('tile-image');
    petalImage.style.zIndex = 1;
    styleStackedImage(petalImage);
    tile.appendChild(petalImage);
}

export function styleStackedImage(imgElement) {
    imgElement.style.position = "absolute";
    imgElement.style.top = "0";
    imgElement.style.left = "0";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.objectFit = "contain";
}

export function createFreezeItemImage(){
    const freezeImage = document.createElement("img");
    freezeImage.src = "images/freezeImage.png";
    freezeImage.alt = "freezeImage";
    freezeImage.classList.add('inventoryItem');
    freezeImage.id = "freezeImage";
    appendInventoryGroupChild(freezeImage);
}

function appendInventoryGroupChild(image){
    // Find the inventoryGroup div and append the image to it
    const inventoryGroup = document.querySelector(".inventoryGroup");
    if (inventoryGroup) {
        inventoryGroup.appendChild(image);
    } else {
        console.warn("No element with class 'inventoryGroup' found.");
    }
}