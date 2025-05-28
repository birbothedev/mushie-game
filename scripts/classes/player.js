export class Player {
    constructor(name){
        this.name = name;
        this.health = 100;
        this.inventory = [];
        this.level = 0;
        this.currency = 0;
    }

    takeDamage(amount){
        this.health -= amount;
    }

    getHealth(){
        return this.health;
    }

    addItem(item){
        this.inventory.push(item);
    }

    addCurrency(amount){
        this.currency += amount;
    }

    getCurrency(){
        return this.currency;
    }

    getLevel(){
        return this.level;
    }

    setLevel(level){
        this.level = level;
    }

    setCurrency(currency){
        this.currency = currency;
    }
}