export class Player {
    constructor(name){
        this.name = name;
        this.health = 100;
        this.inventory = [];
        this.level = 1;
    }

    takeDamage(amount){
        this.health -= amount;
    }

    addItem(item){
        this.inventory.push(item);
    }
}