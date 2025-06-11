export class Enemy {
    constructor(){
        this.health = 50;
        this.x = 0;
        this.y = 0;
        this.frozenState = false;
    }

    setX(x){ 
        this.x = x; 
    }
    setY(y){ 
        this.y = y; 
    }
    getX(){ 
        return this.x; 
    }
    getY(){ 
        return this.y; 
    }
    setDistance(distance){ 
        this.distance = distance; 
    }
    getDistance(){ 
        return this.distance; 
    }
    getFrozenState(){
        return this.frozenState;
    }
    setFrozenState(bool){
        this.frozenState = bool;
    }
}
