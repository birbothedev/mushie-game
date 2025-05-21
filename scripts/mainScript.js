
import { Player } from "./classes/player.js";
import { Enemy } from "./classes/enemy.js";
import { loopThroughTiles } from "./tiles/tileLogic.js";
import { spawnOrMovePlayer } from "./player/movement.js";
import { spawnDangerAndCurrency } from "./tiles/tileEvents.js";
import { spawnEnemy } from "./enemy/enemyEvents.js";


const player = new Player("name");
const enemy = new Enemy();

const spawnTile = document.getElementById("tile3");
let currentTile;

export function getSpawnTile(){
    return spawnTile;
}

export function getCurrentTile() {
    return currentTile;
}

export function setCurrentTile(tile) {
    currentTile = tile;
}

export function getPlayer(){
    return player;
}

export function getEnemy(){
    return enemy;
}

function initialize(){
    setCurrentTile(spawnTile);
    spawnOrMovePlayer(spawnTile);
    loopThroughTiles({ getCurrentTile, setCurrentTile });
    spawnDangerAndCurrency(Array.from(document.querySelectorAll('.tiles')), 20);
    // spawnEnemy();
}       

initialize();
