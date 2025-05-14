import { spawnOrMovePlayer, addPlayerToNewTile, removePlayerFromOldTile } from "../player/movement.js";
import { getCurrentTile, setCurrentTile, getPlayer } from "../mainScript.js";
import { doDamageToPlayer, giveCurrencyToPlayer } from "../player/playerEvents.js";

export function isAdjacent(t1, t2){
    const x1 = parseInt(t1.dataset.x);
    const y1 = parseInt(t1.dataset.y);
    const x2 = parseInt(t2.dataset.x);
    const y2 = parseInt(t2.dataset.y);


    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (dx + dy === 1);
}

export function getAllTiles() {
    return Array.from(document.querySelectorAll('.tiles'));
}

export function loopThroughTiles({ getCurrentTile, setCurrentTile }){
    const currentTiles = Array.from(document.querySelectorAll('.tiles'));

    currentTiles.forEach(tile => {
        tile.addEventListener('mouseover', () => {
            if (isAdjacent(getCurrentTile(), tile)) {
                tile.classList.add('adjacent');
                tile.classList.remove('not-adjacent');
            } else {
                tile.classList.add('not-adjacent');
                tile.classList.remove('adjacent');
            }
        });

        tile.addEventListener('mouseout', () => {
            tile.classList.remove('adjacent', 'not-adjacent');
        });

        tile.addEventListener('click', function(event){
            const clickedTile = event.target.closest('.tiles');
            const currentTile = getCurrentTile();
            removePlayerFromOldTile(currentTile);
            if (isAdjacent(getCurrentTile(), clickedTile)) {
                spawnOrMovePlayer(clickedTile);
                addPlayerToNewTile(clickedTile);
                setCurrentTile(clickedTile);
                doDamageToPlayer(getPlayer());
                giveCurrencyToPlayer(getPlayer());
            }
        });
    });
}

export function styleStackedImage(imgElement) {
    imgElement.style.position = "absolute";
    imgElement.style.top = "0";
    imgElement.style.left = "0";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.objectFit = "contain";
}

export function addDangerToTile(tile){
    tile.classList.add('hasDanger');
}

export function addCurrencyToTile(tile){
    tile.classList.add('hasCurrency');
}

export function coverTiles(){
    getAllTiles().forEach(tile => {
        const coverImage = document.createElement("img"); 
        coverImage.src = `../images/tileCover.png`;
        coverImage.alt = `cover image`;
        coverImage.id = 'tileCoverImage';
        coverImage.style.zIndex = 2;
        styleStackedImage(coverImage);
        tile.appendChild(coverImage);
    });
}

export function removeTileCover(tile){

}