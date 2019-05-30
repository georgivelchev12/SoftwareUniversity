class Laptop {
    constructor(info, quality) {
        this.info = info;
        this.quality = quality;
    }

    turnOn() {
        this.isOn = true;
        this.quality--;
        let price = 800 - info.age * 2 + this.quality * 0.5
        this.price = price;
    }
    turnOff() {
        this.isOn = false;
        this.quality--;
        let price = 800 - info.age * 2 + this.quality * 0.5
        this.price = price;
    }
    showInfo() {
        let jsonFormat = JSON.stringify(this.info);
        let price = 800 - info.age * 2 + this.quality * 0.5
        this.price = price;
        return jsonFormat;
    }
}
let info = { producer: "Dell", age: 2, brand: "XPS" }
let laptop = new Laptop(info, 10)
laptop.turnOn()
console.log(laptop.showInfo())
laptop.turnOff()
console.log(laptop.quality)
laptop.turnOn()
console.log(laptop.isOn)
console.log(laptop.price)

