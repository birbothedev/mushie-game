import { spawnEnemy } from "../enemy/enemyEvents.js";
import { getPlayer } from "../mainScript.js";

export function advanceLevel(){
    let currentLevel = getPlayer().getLevel();
    currentLevel += 1;
    getPlayer().setLevel(currentLevel);

    const levelText = document.getElementById("currentLevelValue");
    levelText.innerText = currentLevel;

    console.log("Level: ", currentLevel);

    if (currentLevel == 1){
        spawnEnemy();
    }
}