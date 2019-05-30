function solve() {

    class Laptop {
        constructor(info, quality) {
            this.info = info;
            this.quality = quality;
            this.price = 0;
        }
        turnOn() {
            this.isOn = true;
            this.quality--;
            this.price = 800 - info.age * 2 + this.quality * 0.5;
        }
        turnOff() {
            this.isOn = false;
            this.quality--;
            this.price = 800 - info.age * 2 + this.quality * 0.5;
        }
        showInfo() {
            this.price = 800 - info.age * 2 + this.quality * 0.5;
            let jsonFormat = JSON.stringify(this.info);
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
}
solve();