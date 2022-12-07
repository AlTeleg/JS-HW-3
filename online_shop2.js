class Good {
    constructor(id, name, description, sizes, price) {
        this.id = Number(id);         
        this.name  = String(name);        
        this.description  = String(description);
        this.sizes = Array(sizes);     
        this.price = Number(price);        
        this.available = Boolean(true); 
    }

    setAvailable() {
        Good.available = true;
    }
}

class GoodList { 
    filter  = /[A-Z]+/i;
    #goods  = [];
    constructor(){        
        this.sortPrice = Boolean(false);  
        this.sortDir = Boolean(true);
    }

    get list() {        
        let sortedList = this.#goods.filter(good => this.filter.test(good.name) && good.available);
        console.log(sortedList)
        if (this.sortPrice) {
            if (this.sortDir) {
                sortedList.sort((a,b) => a.price - b.price);
            }
            else {
                sortedList.sort((a,b) => b.price - a.price);
            }
        }
        return sortedList;
    } 

    add(...good) {
        this.#goods.push(...good); 
    }

    remove(id) {
        for (let good of this.#goods) {
            if (good.id === id) {
                this.#goods.splice(good, 1);
            }
        }
    }    
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }
    get totalAmount(){
        let totalAmount = this.goods.reduce((sum, good) => {
            sum += good.amount;
            return sum;
        },0)
        return totalAmount;    
    } 

    get totalSum() {
        let totalSum = 0;
        this.goods.forEach((good) => {
            totalSum += good.amount*good.price;
        })          
        return totalSum;    
    }

    add(good, amount) {
        for (let position of this.goods) {
            if (good.id === position.id) {
                position.amount += amount;
                return;
            }  
        }
        this.goods.push(new BasketGood(good, amount));
    } 
      
    remove(good, amount) {
        for (let position of this.goods) {
            if (good.id === position.id) {
                if (position.amount > amount) {
                    position.amount -= amount;
                    return;
                }
            }   
        }
        this.goods.splice(position, 1); 
    }

    clear() {
        this.goods = [];
    } 
    
    removeUnavailable() {
        for (let position of this.goods) {
            if (position.available === false) {
                this.goods.splice(position, 1);
            }
        }
    }
}


good1 = new Good(1, "TV", "cool", [32, 33, 38], 4500);
good2 = new Good(2, "dress", "long", [38, 40, 42], 800, false);
good3 = new Good(3, "motherboard", "new", ["atx"], 350, false);
good4 = new Good(4, "shoes", "classic", [40, 42, 43], 300);
good5 = new Good(5, "table", "round", ["big", "small"], 500, false);

basket = new Basket();
goodList = new GoodList();

goodList.add(good1, good2, good3, good4, good5);

basket.add(good1, 1);
basket.add(good3, 5);
console.log(basket.totalSum);
console.log(basket.totalAmount);


console.log(basket.goods);

basket.add(good1, 3);

console.log(basket.goods);
console.log(basket.totalSum);
console.log(basket.totalAmount);

basket.removeUnavailable();

console.log(basket.goods);

basket.clear();

console.log(basket.goods);

goodList.remove(1);

console.log(goodList.list[0]);

goodList.sortPrice = true;

console.log(goodList.list[0]);

goodList.sortDir = false;
goodList.add(good1);

console.log(goodList.list[0]);
