//challenge 1: your age in days
function ageindays(){
var birthyear = prompt("what year you were born my friend....?")
var AID=(2020-birthyear)*365
var h1= document.createElement('h1');
var textAnswer = document.createTextNode('you are' + AID + 'Days old .');
h1.setAttribute('id','ageindays');
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1);

}
function reset(){
    document.getElementById('ageindays').remove();
}
//challenge 2: cat generator
function generatecat(){
    var  image =document.createElement('img');
    var div=document.getElementById('flex-box-gen')
    image.src="static/images.jpg";
    div.appendChild(image)
}
//challenge 3:Rock,paper,scissors
function rpsGame(yourchoice) {
    console.log(yourchoice);
    var humanchoice,botchoice;
    humanchoice=yourchoice.id;
    botchoice=NumberToChoice(randToRpsInt());
    console.log(botchoice);
    results=decidewinner(humanchoice,botchoice);//[0,1] humanlosyt|bot won
    console.log(results); 
    message=finalMessage(results);// {'message':'you won','color ':'green'}
    console.log(message);
    rpsfrontend(yourchoice.id,botchoice,message);

}
function randToRpsInt(){
    return Math.floor(Math.random()*3);
}
function NumberToChoice(Number){
    return['rock','paper','scissors'][Number];
}
function decidewinner(yourchoice,computerchoice){
    var rpsdatabase ={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0 }
    };
    var yourScore= rpsdatabase[yourchoice][computerchoice];
    var computerScore = rpsdatabase[computerchoice][yourchoice];
    return [yourScore,computerScore];
}
function finalMessage([yourScore,computerScore]){
    if (yourScore === 0){
        return {'message':'you lost !','color':'red'};
    } else if(yourScore === 0.5){
        return {'message':' its a tie ','color':'yellow'};
    } else {
        return {'message' : 'you win' , 'color' : 'green'};
    }
}
function rpsfrontend(humanImageChoice,botImageChoice,finalMessage){
    var imagedatabase ={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv =document.createElement('div');
    var messageDiv =document.createElement('div');
    var botDiv =document.createElement('div');

    humanDiv.innerHTML ="<img src='"+imagedatabase[humanImageChoice]+"' height =150 width =150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color: "+ finalMessage['color']+"; font-size: 60px; padding:30px; '>"+  finalMessage['message']+"</h1>"
    botDiv.innerHTML ="<img src='"+imagedatabase[botImageChoice]+"' height =150 width =150 style='box-shadow: 0px 10px 50px rgba(248,38,23,1);'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv); 
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challeneg 4: change the color of all buttons
var all_buttons =document.getElementsByTagName('button');
var copyAllButtons =[];
for( let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons)

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonsRed();
    }else if(buttonThingy.value === 'green'){
        buttonsGreen();
    }else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    }else if(buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0; i< all_buttons.length; i++){
       all_buttons[i].classList.remove(all_buttons[i].classList[1]);
       all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices=['btn-primary','btn-danger','btn-success','btn-warning']
    for(let i=0; i< all_buttons.length; i++){
        var randomNumber = Math.floor(math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomNumber])
    }
}
// challenege 5: blackjack
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0 },
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver':false,
};

const YOU= blackjackGame['you']
const DEALER =blackjackGame['dealer']
const hitSound= new Audio('static/sounds/swish.m4a');
const winSound= new Audio('static/sounds/cash.mp3');
const lostSound= new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
    let card=randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
}
function randomCard(){
    let randomIndex= Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(card,activePlayer) {
    if(activePlayer['score'] <= 21){
         let cardImage= document.createElement('img');
         cardImage.src=`static/images/${card}.png`
         document.querySelector(activePlayer['div']).appendChild(cardImage);
         hitSound.play();
    }
}
function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false;
        let yourImages= document.querySelector("#your-box").querySelectorAll('img');
        let DealImages= document.querySelector("#dealer-box").querySelectorAll('img');
        for(i=0 ; i<DealImages.length ; i++){
            DealImages[i].remove();
        }
        for(i=0 ; i<yourImages.length ; i++){
            yourImages[i].remove();
        }
    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='white';
    document.querySelector('#dealer-blackjack-result').style.color='white';

    document.querySelector('#blackjack-result').textContent =" Let's Play";
    document.querySelector('#blackjack-result').style.color ='black';

    blackjackGame['turnsOver'] = true;
    }

}
function updateScore(card,activePlayer){
    //if  adding 11 keeps me below 21,add 11.otherwise add 1
if(card === 'A'){

    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
    activePlayer['score']+= blackjackGame['cardsMap'][card][1];
      }else{
        activePlayer['score']+= blackjackGame['cardsMap'][card][0];
           }
  } 
  else{
     activePlayer['score']+= blackjackGame['cardsMap'][card];
    }
}


function showScore(activePlayer){
    if(activePlayer['score'] > 21){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST..!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

 async function dealerLogic(){
    blackjackGame['isStand'] = true;
    while(DEALER['score']<16 && blackjackGame['isStand'] === true){
        let card =randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
   let winner= computeWinner();
   ShowResult(winner);
   console.log(blackjackGame['turnsOver']);
    

}
//compute winner and return who just won
//update the wins,losses,draws 
function computeWinner(){
    let winner;

    if(YOU['score'] <=21){
        //condition: higher score than dealer or when dealer busts but your 21 or under
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
         winner = DEALER;
        } else if(YOU['score'] === DEALER['score']){
            console.log("you drew..!");
            blackjackGame['draws']++;
        }
        //condition: when user busts but dealer doesn't
    }else if(YOU['score'] >21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
        
      //condition: when you and the dealer busts  
    }else if(YOU['score'] > 21 &&  DEALER['score'] >21){
        blackjackGame['draws']++;
        console.log("you drew..!");
    }
    return winner;  
}

function ShowResult(winner){
    let message ,messageColor;
    if(blackjackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message ='you won..!';
            messageColor ='green';
            winSound.play();
        }else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'you lost!';
            messageColor = 'red';
            lossSound.play();

        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message='you drew..!';
            messageColor ='black';
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
}