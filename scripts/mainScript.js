
import { Player } from "./classes/player.js";
const player = new Player("name");

const spawnTile = document.getElementById("tile3");

initialize();

function initialize(){
    spawnPlayer();
}

function spawnPlayer(){
    const playerImage = document.createElement("img"); 
    playerImage.src = `../images/player.png`;
    playerImage.alt = `player image`;
    playerImage.id = 'playerImage';
    spawnTile.appendChild(playerImage);
}

function spawnDanger(){
    return;
}

function movePlayer(){
    return;
}