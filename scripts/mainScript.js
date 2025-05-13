
import { Player } from "./classes/player.js";
import { loopThroughTiles } from "./tiles/tileLogic.js";
import { spawnOrMovePlayer } from "./player/movement.js";
import { spawnDangerAndCurrency } from "./tiles/tileEvents.js";

const player = new Player("name");

const spawnTile = document.getElementById("tile3");
let currentTile;

export function getCurrentTile() {
    return currentTile;
}

export function setCurrentTile(tile) {
    currentTile = tile;
}

function initialize(){
    setCurrentTile(spawnTile);
    spawnOrMovePlayer(spawnTile);

    loopThroughTiles(getCurrentTile, setCurrentTile);
    spawnDangerAndCurrency(Array.from(document.querySelectorAll('.tiles')), 10);

}

initialize();


// function loopThroughTiles(){
//     const currentTiles = Array.from(document.querySelectorAll('.tiles'));

//     currentTiles.forEach(tile => {
//         tile.addEventListener('mouseover', () => {
//             if (isAdjacent(currentTile, tile)) {
//                 tile.classList.add('adjacent');
//                 tile.classList.remove('not-adjacent');
//             } else {
//                 tile.classList.add('not-adjacent');
//                 tile.classList.remove('adjacent');
//             }
//         });

//         tile.addEventListener('mouseout', () => {
//             tile.classList.remove('adjacent');
//             tile.classList.remove('not-adjacent');
//         });

//         tile.addEventListener('click', function(event){
//             const clickedTile = event.target.closest('.tiles');
//             if (isAdjacent(currentTile, clickedTile)){
//                 spawnOrMovePlayer(clickedTile);
//                 currentTile = clickedTile;
//             }
//         });
//     });
// }


// function spawnOrMovePlayer(tile){
//     // check if player image exists, if so remove it
//     const existingPlayer = document.querySelector("#playerImage");

//     if (existingPlayer) {
//     existingPlayer.remove();
//     }

//     const playerImage = document.createElement("img"); 
//     playerImage.src = `../images/player.png`;
//     playerImage.alt = `player image`;
//     playerImage.id = 'playerImage';
//     tile.appendChild(playerImage);

//     const row = parseInt(tile.dataset.x);
//     if (row === 6){
//         replaceRow();
//     }
// }

// function spawnDangerAndCurrency(row, validTilesINT){
//     // TODO ADD TILE.HASCHILDNODES() CHECK AFTER REMOVING NUMBERS FROM DIVS
//     const validTiles = Array.from(row).filter(tile => tile !== currentTile && !tile.hasChildNodes());

//     // Ensure there are at least the given number of valid tiles
//     if (validTiles.length < validTilesINT) {
//         console.warn("Not enough valid tiles to spawn 10 danger and 10 petal tiles.");
//         return;
//     }

//     // Shuffle the valid tiles
//     for (let i = validTiles.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [validTiles[i], validTiles[j]] = [validTiles[j], validTiles[i]];
//     }

//     const dangerCount = Math.floor(validTilesINT / 2);

//     // First danger then currency
//     for (let i = 0; i < dangerCount; i++) {
//         const tile = validTiles[i];
//         const dangerImage = document.createElement("img"); //i 
//         dangerImage.src = `../images/dangerTile.png`;
//         dangerImage.alt = `danger image`;
//         dangerImage.id = 'dangerImage';
//         tile.appendChild(dangerImage);
//     }

//     for (let i = dangerCount; i < validTilesINT; i++) {
//         const tile = validTiles[i];
//         const petalImage = document.createElement("img"); 
//         petalImage.src = `../images/petalTile.png`;
//         petalImage.alt = `petal image`;
//         petalImage.id = 'petalImage';
//         tile.appendChild(petalImage);
//     }
// }

// function isAdjacent(t1, t2){
//     const x1 = parseInt(t1.dataset.x);
//     const y1 = parseInt(t1.dataset.y);
//     const x2 = parseInt(t2.dataset.x);
//     const y2 = parseInt(t2.dataset.y);


//     const dx = Math.abs(x1 - x2);
//     const dy = Math.abs(y1 - y2);

//     return (dx + dy === 1);
// }

// function replaceRow(){
//     console.log("Replacing row 6");
//     let tileCount = 0;

//     // Remove all row1 tiles
//     let row1tiles = document.querySelectorAll('.row1');
//     row1tiles.forEach(tile => tile.remove());
    
//     // Shift all tiles up by 1 row
//     getAllTiles().forEach(tile => {
//         tileCount ++;
//         let currentX = parseInt(tile.dataset.x);
//         if (currentX > 1) {
//             tile.dataset.x = currentX - 1;
//             tile.classList.remove(`row${currentX}`);
//             tile.classList.add(`row${currentX - 1}`);
//             tile.id = `tile${tileCount - 1}`;
//         }
//     });

//     // Add a new row at the bottom (row6)
//     const gridContainer = document.getElementById('gameContainer');

//     for (let i = 1; i <= 5; i++) {
//         const newTile = document.createElement('div');
//         newTile.classList.add('tiles', 'row6');
//         newTile.id = `tile${document.querySelectorAll('.tiles').length + 1}`;
//         newTile.dataset.x = 6;
//         newTile.dataset.y = i;

//         gridContainer.appendChild(newTile);
//     }

//     let row6tiles = document.querySelectorAll('.row6');
//     spawnDangerAndCurrency(Array.from(row6tiles), 2);
//     loopThroughTiles();
// }

// function getAllTiles() {
//     return Array.from(document.querySelectorAll('.tiles'));
// }