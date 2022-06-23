
const playerHandStrength = (hand, theBoard)=>{
    //add all cards into an array
    let allCards = []
    hand.forEach((card)=>allCards.push(card))
    theBoard.forEach((card)=>allCards.push(card))
    console.log(allCards)

    //initialize handstrength to empty array
    let handStrength = []

    //Check for straight flushes. If so, strength is top of SF. If found, end this function and return.
    let isSF = straightFlush(allCards)
    if (isSF[0]){
        handStrength.push(8,isSF[1])
        return handStrength
    }
}
//function to check for straight flushes
const straightFlush = (cards)=>{
    console.log(cards)

    const checkOtherCards = (cardsArray) =>{
        for (let card of cardsArray){
            console.log('Checking', card)
            if ((card[0] === sfTop[0]+1) && (card[1] === sfTop[1])){
                console.log("newtop" , card)
                sfTop = card
                sfProgress.push(card)
            }else if((card[0] === sfBottom[0]-1) && (card[1] === sfTop[1])){
                sfBottom = card
                sfProgress.unshift(card)
            }
    }

    //SF requires all 5 cards, therefore only need to check first 3 of 7
    for (let i = 0; i < 3; i ++){

        //initialize SF progress
        let sfProgress = [cards[i]]
        let sfBottom = cards[i]
        let sfTop = cards[i]

        //iterate through other cards (first card pushed will just pass through and do nothing. I'm too lazy to filter it.)
        for( let card of cards){
            
        }
        
            //if we made the straight flush, return true and the top value
            if (sfProgress.length === 5){
                return [true , sfTop]
            }
        }
        return [false , 0]
    }
}

const cardsInOrder = (cardArr)=> {
    let cardsArray = cardArr.slice()

    //initialize the first card in orderedCards to the last card of the array.
    let orderedCards = [cardsArray.pop()]

    //iterate through the remaining list.
    for (let card1 of cardsArray){
        console.log(card1)
        //check each card in the array of ordered cards.
        for (let index = 0 ; index<orderedCards.length; index++){
            console.log('comparing to ', orderedCards[index])
            //if card1 is less than this card, put it in that position, shifting the orderedCard over.
            if (card1 <= orderedCards[index]){
                orderedCards.splice(index,0,card1)
            }

            //if we get to the end of the array and the card hasn't been added, attach it to the end.
            if ((index+1 === orderedCards.length) && (card1 > orderedCards[index])){
                orderedCards.push(card1)
            }
        }
    }
    return orderedCards
}

const card1 = [5,'d']
const card2 = [11,'h']
const card3 = [11,'s']
const card4 = [12,'s']
const card5 = [7,'d']
const card6 = [8,'d']
const card7 = [9,'d']
const card8 = [11,'c']
const card9 = [6,'d']

const heroHand = [card1, card2]
const board = [card5, card6, card7, card8, card9]
const villianHand = [card3, card4]

console.log(cardsInOrder(heroHand, board))