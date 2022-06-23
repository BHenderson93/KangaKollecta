const startCount = (option) => {
    
    const counting = () => {
        count += 1
        counter.innerText = `Current count: ${count}`
    }
    
    if (option == 0 && counterOn == false) {
        counterOn = true
        intID = setInterval(counting, 1000)
    } else if (option === 2 && counterOn == true && intID !== '') {
        clearInterval(intID)
    } else if (option === 1 && counterOn == true && intID !== '') {
        clearInterval(intId)
        count = 0
        counter.innerText = `Current count: ${count}`
    }
}

document.getElementById('buttonContainer').addEventListener('click', () => {
    let target = event.target.id

    if (target === 'startbtn') {
        startCount(0)
    } else if (target === 'stopbtn') {
        startCount(1)
    } else if (target === 'pausebtn') {
        startCount(2)
    } else {
        return
    }
})

//set interval, clearInterval
let counterOn = false
let counter = document.getElementById('counter')
let count = 0;
let intID = ''