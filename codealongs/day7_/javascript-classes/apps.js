console.log('hi')

class Person {
    constructor() {
        this.legs = 2
        this.arms = 2
        this.eyes = 'brown'
        this.hair = 'black'
    }
    greet(person) {
        console.log(`Hello, ${person}.`)
    }
    setHairColor(hairColor) {
        this.hair = hairColor
    }
    jump() {
        console.log('How high?')
    }
}

const me = new Person()
const bob = new Person()

me.greet('bob')
me.setHairColor = 'blonde'
console.log(me)

class Hero extends Person {
    fly() {
        console.log('Woooooooosh')
    }
    greet(person) {
        console.log(`Why hello there, ${person}.`)
    }
}
const superman = new Hero()
console.log(superman)
superman.fly()

class Car {
    constructor(serialNumber) {
        this.serialNumber = serialNumber
    }
    drive() {
        console.log('Vroom')
    }
}
class AutoPlant {

    constructor(maker) {
        this.maker = maker
        this.cars = []
    }

    generateCar() {
        const newCar = new Car(this.cars.length+3)
        this.cars.push(newCar)
        return newCar
    }

    findCar(index) {
        return this.cars[index]
    }
}

let nissanPlant = new AutoPlant("Nissan")
while (nissanPlant.cars.length<10){
    nissanPlant.generateCar()
}
console.log(nissanPlant.cars.filter((car) => car.serialNumber === 7 ))