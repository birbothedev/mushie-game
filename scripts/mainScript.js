
import { Player } from "./classes/player.js";
const player = new Player("name");

const spawnTile = document.getElementById("tile3");
let currentTile;

initialize();

function initialize(){
    currentTile = spawnTile;
    spawnOrMovePlayer(spawnTile);

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
