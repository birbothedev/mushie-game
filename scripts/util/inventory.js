export function listenForInventoryClicks(){
    const freeze = document.getElementById("freezeImage");
    freeze.addEventListener('click', function(){
        useFreeze();
    });
}

function useFreeze(){
    console.log("using freeze");
}