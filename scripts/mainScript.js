
import { Player } from "./classes/player.js";
const player = new Player("name");

const spawnTile = document.getElementById("tile3");
let currentTile;

initialize();

function initialize(){
    currentTile = spawnTile;
    spawnOrMovePlayer(spawnTile);

    loopThroughTiles();

}

function loopThroughTiles(){
    let allTiles = document.querySelectorAll('.tiles');
    allTiles.forEach(tile => {
        tile.addEventListener('mouseover', () => {
            if (isAdjacent(currentTile, tile)) {
                tile.classList.add('adjacent');
                tile.classList.remove('not-adjacent');
            } else {
                tile.classList.add('not-adjacent');
                tile.classList.remove('adjacent');
            }
        });

        tile.addEventListener('mouseout', () => {
            tile.classList.remove('adjacent');
            tile.classList.remove('not-adjacent');
        });

        tile.addEventListener('click', function(event){
            const clickedTile = event.target.closest('.tiles');
            if (isAdjacent(currentTile, clickedTile)){
                spawnOrMovePlayer(clickedTile);
                currentTile = clickedTile;
            }
        });
    });
}

function spawnOrMovePlayer(tile){
    // check if player image exists, if so remove it
    const existingPlayer = currentTile.querySelector("#playerImage");
    if (existingPlayer) {
    existingPlayer.remove();
    }

    const playerImage = document.createElement("img"); 
    playerImage.src = `../images/player.png`;
    playerImage.alt = `player image`;
    playerImage.id = 'playerImage';
    tile.appendChild(playerImage);

    const row = parseInt(tile.dataset.x);
    if (row === 6){
        replaceRow();
    }
}

function spawnDanger(){
    return;
}

function isAdjacent(t1, t2){
    const x1 = parseInt(t1.dataset.x);
    const y1 = parseInt(t1.dataset.y);
    const x2 = parseInt(t2.dataset.x);
    const y2 = parseInt(t2.dataset.y);


    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (dx + dy === 1);
}

function replaceRow(){
    console.log("Replacing row 6");
    let tileCount = 0;

    // Remove all row1 tiles
    let row1tiles = document.querySelectorAll('.row1');
    row1tiles.forEach(tile => tile.remove());
    
    // Shift all tiles up by 1 row
    let allTiles = document.querySelectorAll('.tiles');
    allTiles.forEach(tile => {
        tileCount ++;
        let currentX = parseInt(tile.dataset.x);
        if (currentX > 1) {
            tile.dataset.x = currentX - 1;
            tile.classList.remove(`row${currentX}`);
            tile.classList.add(`row${currentX - 1}`);
            tile.id = `tile${tileCount - 1}`;
        }
    });

    // Add a new row at the bottom (row6)
    const gridContainer = document.getElementById('gameContainer');

    for (let i = 1; i <= 5; i++) {
        const newTile = document.createElement('div');
        newTile.classList.add('tiles', 'row6');
        newTile.id = `tile${document.querySelectorAll('.tiles').length + 1}`;
        newTile.dataset.x = 6;
        newTile.dataset.y = i;

        gridContainer.appendChild(newTile);
    }

    loopThroughTiles();
}
