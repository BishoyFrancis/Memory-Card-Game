//The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle. (SOF)
function shuffleOrder(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    } return array;}

// 1.Randomize Cards Positions
// 2.Add Event Listeners to Cards    
function intializaGame(order)
{
    console.log(cards.length , order.length)
    cards_order = shuffleOrder(cards_order);
    for(i=0 ; i<cards.length;i++){
        cards[i].style.order = cards_order[i];
    }
}

function addevents(){
    for(i=0 ; i < cards.length ; i++){
        cards[i].addEventListener('click', function(){flipCard(this);})}
}


function flipCard(card){
    card.classList.add('isflipped');
    //console.log(flippedCards)
    flippedCards.push(card)
    if(flippedCards.length == 2){
        restrictclicks();
        isMatch(flippedCards[0] , flippedCards[1]); 
        ////console.log("2 cards are flipped");
        numberOfMoves++;
    }
    console.log("CURRENT NUMBER OF MOVES",numberOfMoves)
    document.querySelector('.moves').innerHTML = numberOfMoves;
}

function restrictclicks(){
    for (i = 0 ; i < cards.length ; i++){
        cards[i].classList.add('cancelclick');
    }

    setTimeout(()=>{for (i = 0 ; i < cards.length ; i++){
        cards[i].classList.remove('cancelclick');
    }
},1200)
}

function isMatch(firstCard , secondCard){
    if(firstCard.querySelector('img').src == secondCard.querySelector('img').src){
        console.log("They are Match");
        flippedCards.pop();
        flippedCards.pop();
        setTimeout(()=>{var audio = new Audio('Audio/correct.mp3');
        audio.play();},700)
    }
    else{
        console.log(flippedCards.length)
        console.log("THey arent match");
        setTimeout(()=>{ firstCard.classList.remove('isflipped');
        secondCard.classList.remove('isflipped');},1100)
        setTimeout(()=>{var audio = new Audio('Audio/false.mp3');
        audio.play();},1000)
        flippedCards.pop();
        flippedCards.pop();
        
        console.log(flippedCards.length)
    }
}

function hintPress(){
    if(numberOfHints > 0){
        for(i = 0 ; i < cards.length ; i++){
            if(!cards[i].classList.contains('isflipped')){
                cards[i].classList.add('ishint')
            }
        }
    setTimeout(()=>{for(i = 0 ; i < cards.length ; i++){
        cards[i].classList.remove('ishint')
    }},hintDuration(difficulty))
    numberOfHints--;
    document.querySelector('.hintsleft').innerHTML = numberOfHints;
}
else{alert("No more hints available")}
}

function newgame(){
    location.reload();
}

function hintDuration(levelDifficulty){
    if(levelDifficulty == 'easy'){
        console.log("Hint in easy")
        return 1000;
    }
    else if(levelDifficulty == 'meduim'){console.log("Hint in meduim")
    return 1400;}
    else{return 2000;}
}

var difficulty = location.href.slice(location.href.indexOf("?")+1,);
var hintTime ;
var flippedCards = []
var numberOfMoves = 0;
var numberOfHints = 3;


var gameBoard = document.querySelector('.game-board');
//console.log(gameBoard);
cards = document.querySelectorAll('.card-container');
//[0...cards_length]
cards_order = Array.from(cards.keys());

//Game Loop

intializaGame(cards_order);
addevents();




