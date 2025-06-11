
import { Player } from "./classes/player.js";
import { loopThroughTiles } from "./tiles/tileLogic.js";
import { spawnOrMovePlayer } from "./player/movement.js";
import { spawnDangerAndCurrency } from "./tiles/tileEvents.js";
import { listenForButtonClicks } from "./util/util.js";


const player = new Player("name");

const spawnTile = document.getElementById("tile3");
let currentTile;
let enemy;

export const tileMap = new Map();

export function initializeTileMap(){
    const tiles = Array.from(document.querySelectorAll('.tiles'));
    tiles.forEach(tile => {
        const key = getKey(tile);
        tileMap.set(key, {
            visited: false,
            hasPlayer: false,
            hasDanger: false,
            hasCurrency: false,
            hasEnemy: false,
            domRef: tile
        });
    });
}

export function getKey(tile){
    return tile.dataset.x + "," + tile.dataset.y;
}

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

export function setEnemy(setEnemy){
    enemy = setEnemy;
}

function initialize(){
    initializeTileMap();
    setCurrentTile(spawnTile);
    spawnOrMovePlayer(spawnTile);
    loopThroughTiles({ getCurrentTile, setCurrentTile });
    spawnDangerAndCurrency(Array.from(document.querySelectorAll('.tiles')), 14);
    listenForButtonClicks();
}       

initialize();
