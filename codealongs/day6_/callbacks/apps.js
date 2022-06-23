/* function greeting() {
    console.log("Hello, World!");
}

function formalGreeting(informalGreeting) {
    informalGreeting();
    console.log("How are you?");
}

formalGreeting(greeting)

function returnRandom() {
    return (Math.random()*100).toFixed();
}

function yellRandom(randomNumGenerator) {
    console.log("GENERATOR DEFINITION: ", randomNumGenerator)
    console.log("YOUR RANDOM NUMBER IS: "+randomNumGenerator());
}

yellRandom(returnRandom)

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function calculator(operation, number1, number2) {
    console.log('Inside calculator!');
    let result = operation(number1, number2); // returns a number
    console.log('The result is', result);
} */

function yellAtPerson(person, mood){
    function angryThings (i){
        let angrySayings = [`You suck, ${i}! `, `Booooooooooo ${i}` , `${i}, you are so lame...`]
        return angrySayings[Math.floor(Math.random()*angrySayings.length)]
    }
    function niceThings (i) {
        let niceSayings = [`${i}, you look good today` , `${i}, nice bod'!` , `Cool code, ${i}!`]
        return niceSayings[Math.floor(Math.random()*niceSayings.length)]
    }

    if (mood === 'angry'){
        return angryThings(person)
    } else {
        return niceThings(person)
    }
}
console.log(yellAtPerson( 'Rome' , 'angry'))
console.log(yellAtPerson('Rome'))
