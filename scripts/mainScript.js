
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
    loopThroughTiles({ getCurrentTile, setCurrentTile });
    spawnDangerAndCurrency(Array.from(document.querySelectorAll('.tiles')), 10);
}

initialize();
