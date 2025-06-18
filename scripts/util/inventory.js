import { getEnemy } from "../mainScript.js";

export function listenForInventoryClicks(){
    const freeze = document.getElementById("freezeImage");
    freeze.addEventListener('click', function(){
        useFreeze();
    });
}

function useFreeze(){
    console.log("using freeze");

    const enemy = getEnemy();
    enemy.setFrozenState(true);
    
}