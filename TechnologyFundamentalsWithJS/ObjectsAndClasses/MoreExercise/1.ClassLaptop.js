class Laptop {
    constructor(info, quality) {
        this.info = info;
        this.quality = +quality;
        this.price = (800 - Number(this.info.age) * 2 + this.quality * 0.5);
        this.isOn = false;
    }
    turnOn() {
        if (!this.isOn) {
            this.isOn = true;
            this.quality--;
        }
        this.price = (800 - Number(this.info.age) * 2 + this.quality * 0.5);
        
      }
    turnOff() {
        if (this.isOn) {
            this.isOn = false;
            this.quality--;
        }
        this.price = (800 - Number(this.info.age) * 2 + this.quality * 0.5);
        
    }
    showInfo() { 
        let jsonFormat = JSON.stringify(this.info);
        return jsonFormat;
    }
}
info = { producer: "Dell", age: 2, brand: "XPS" }
let laptop = new Laptop(info, 10)
laptop.turnOn()
console.log(laptop.showInfo())
laptop.turnOff()
console.log(laptop.quality)
laptop.turnOn()
console.log(laptop.isOn)
console.log(laptop.price)