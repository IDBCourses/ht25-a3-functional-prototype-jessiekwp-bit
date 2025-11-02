/*
 * IDB Programming: Code Playground
 *
 */

//Game: "Orange Catcher 🍊"
//Developer: Wan Pui Kwok
//Rules: 
//The player(rectangle) needs to completely catch then eat the oranges.
//The orange has to be completely inside the player.  


import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let player = Util.thing;
let orange = Util.createThing();
let oranges = [];
let fallSpeed = 2;

let prevKey = null;
let currKey = null;
let timeoutID = null;
let px = (window.innerWidth*0.5);
let timeLeft = 30; //seconds
let timerInterval; //store interval ID
let nOranges = 0;
let isGameOver = false;


//CONST VARIABLE//
// Settings variables should contain all of the "fixed" parts of your programs

const orangeXPos = [0.2, 0.9, 0.5, 0.3, 0.7, 0.1, 0.8, 0.4, 0.1, 0.6];
//an array of the x-positions of the orange

const row = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
//an array of the keys of the row on the keyboard

const orangesDisplay = document.getElementById("orangesDisplay");

for(let i=0; i < orangeXPos.length; i++){ 
  oranges.push({x: orangeXPos[i], y:0});
}
//for loop: use the x-positions to create orange objects and add them to the oranges array

let currentOrangeIndex = 0; //can simplify these 4 lines?
let currentOrange = oranges[currentOrangeIndex];
let x = window.innerWidth * currentOrange.x;
let y = currentOrange.y;


//FUNCTION LOOP//
// Code that runs over and over again
function loop() {
  y += fallSpeed; 
 Util.setPositionPixels(x, y, orange);

const orangeRect = orange.getBoundingClientRect();
// get the orange's actual position on screen

if(orangeRect.top > window.innerHeight && !isGameOver ){
resetOrange();
} // reset orange when it goes below the screen and when game is not over yet

  Util.setPositionPixels(px, window.innerHeight *0.65, player)

  if(!isGameOver){
    window.requestAnimationFrame(loop);
  }
}

function eatOrange(){  
  Util.setColour(35, 100, 50, 0, orange);
} //the opacity is changed to 0 because the orange is "eaten" (becomes invisible)

function resetOrange(){
 currentOrangeIndex = Math.floor(Math.random()* oranges.length);
 currentOrange = oranges[currentOrangeIndex];
 // pick a random orange position from array

 x = window.innerWidth * currentOrange.x;
 y = 0;
  //reset orange position on top

 Util.setColour(35, 100, 50, 1, orange);
  //opacity:1 -> make orange visible again

 fallSpeed += 0.15;  //increase the speed of every new orange
}

function collision(){
 const orangeRect = orange.getBoundingClientRect();
 const playerRect = player.getBoundingClientRect();

 return(
  orangeRect.left >= playerRect.left &&
  orangeRect.right <= playerRect.right &&
  orangeRect.top >= playerRect.top &&
  orangeRect.bottom <= playerRect.bottom
 );
}

function swipeDirection(){
  let prevIndex = row.indexOf(prevKey);
  let currIndex = row.indexOf(currKey);


  if( currIndex < 0 || prevIndex < 0){
    return 0;
  } else {
    let diffIndex = currIndex - prevIndex;

    if(diffIndex > 1 || diffIndex < -1){
      return 0;
    } else {
      return diffIndex;
    }
  }
}

function resetKeys(){
  prevKey = null;
  currKey = null;
}

function gameOver(){
  isGameOver = true;
  clearInterval(timerInterval); //stop the timer immediately
  alert("Game Over! Try again! :)🍊")
}

function winGame(){
  alert("🍊🍊🍊🍊You win! You are the best 'Orange Catcher'! 🍊🍊🍊🍊") //show winning message
  clearInterval(timerInterval); //stop the countdown
  isGameOver = true; //stop the loop of falling orange
}  


//FUNCTION SETUP//
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {

//properties of player
Util.setColour(0, 0, 100, 0, player);
Util.setRoundedness(0, player);
Util.setSize(160,300, player);

//properties of orange
Util.setColour(35, 100, 50, 1, orange);
Util.setRoundedness(1, orange);
Util.setSize(80, 80, orange);
Util.setPositionPixels(x, y, orange);


  // Put your event listener code here
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE' && collision()){
      if(isGameOver) return;
      eatOrange(); //orange can be eaten when orange is completely inside player and KeyE is tapped
      nOranges ++; //number of oranges is increased by 1
      orangesDisplay.textContent = `(っ˘ڡ˘ς) Eaten oranges: ${nOranges} 🍊`;
      //text displayed at top left corner: show the number of eaten oranges

      resetOrange(); //a new orange is being launched after the previous one is being eaten
      if(nOranges === 10){ 
        setTimeout(winGame, 100); //Winning condition: has eaten 10 oranges. The game ends there.
        //create 0.1 second delay so "10" can be displayed when win game
      }
    }
  })

  //swipe the row(KeyA-KeyL) to move the player left and right
  document.addEventListener('keydown', (event) => {
    if(isGameOver) return;
    clearTimeout(timeoutID);
    prevKey = currKey;
    currKey = event.code;
    let dir = swipeDirection();
    px += dir*50;
    Util.setPositionPixels(px, window.innerHeight *0.6, player);
  })

//
  document.addEventListener('keyup', (event) => {
    if(isGameOver) return;
    timeoutID = setTimeout(resetKeys, 75);
  })

// start countdown timer
  timerInterval = setInterval(() =>{
  timeLeft --; //countdown every 1 second
  document.getElementById("timer").textContent = `🧡Goal: Eat 10 oranges 🍊! Time left: ${timeLeft} `;

  if(timeLeft <=0){
    clearInterval(timerInterval);
    setTimeout(gameOver, 100);
    //create 0.1 second delay so the time left displayed is accurate
  }
}, 1000); // counting down every 1 second


  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!