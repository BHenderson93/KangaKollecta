console.log('hi')
//const clickBtn = document.querySelector('#get-users-btn')


const response = fetch("https://randomuser.me/api?results=5").then((response) => {
    response.json().then((data) =>{
    let pic = document.createElement('img')
    pic.src = data.results[0].picture.large
    document.body.append(pic)

    console.log(data.results[13])
})})

//console.log(response)