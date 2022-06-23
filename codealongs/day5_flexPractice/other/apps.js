
//array of names, and empty array of people who have answered.
let names = ["person1","person2","person3","person4"]
let hasAnswered = [];

//Watches the button
const button = document.querySelector('.pick');

//When the button is clicked, execute the logic below
button.addEventListener('click', function(){
    let statements = askRandomIceBreaker(names)
    // length of 2 means that our array was returned with results. There's probably better logic to use here, like isArray(), etc.
    if (statements.length === 2){
      console.log(statements[0])
      hasAnswered.push(statements[1])
      console.log(hasAnswered)
      //if it's not length 2, then it's our string of no more people
    }else{
      console.log(statements)
    }
  })

//function to be ran
function askRandomIceBreaker(nameArray){
  
  //list of icebreakers, feel free to add more. Shouldn't break function.
  let iceBreakers = ["Where in your house do you check most often for murderers?","The Zombie Apocalypse has started. Create your ideal battle bus","If you had to row a boat with any piece of candy, what candy would you chose.", "What was the hardest part about this week? What about the best part?","What is the thing you feel most guilty about?"]
  
  //Grab a name and remove it from the list.
  let nextPerson = names.splice(Math.floor(Math.random()*names.length) ,1)
  
  //If a "nextPerson" exists, ask them an icebreaker
  if (nextPerson.length>0){
   let randQ = iceBreakers[Math.floor(Math.random()*iceBreakers.length)];
    return [`${nextPerson}, you're up! Tell us... ${randQ} We're dying to know.` , nextPerson]
      
    //If there's no more people, return a message saying so
  } else{
     return 'No more people!'
  }
}