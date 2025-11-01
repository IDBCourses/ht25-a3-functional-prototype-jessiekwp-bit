/*
 * IDB Programming: Code Playground
 *
 */

//Game: "Orange Catcher"
//Designer: Wan Pui Kwok
//Rules: 


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


//CONST VARIABLE//
// Settings variables should contain all of the "fixed" parts of your programs
const orangeXPos = [0.2, 0.9, 0.5, 0.3, 0.7, 0.1, 0.8, 0.4, 0.1, 0.6];
const row = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];

// Create an array of orange objects with starting positions
for(let i=0; i < orangeXPos.length; i++){  //for loop 
  oranges.push({x: orangeXPos[i], y:0});
}

let currentOrangeIndex = 0; //can simplify these 4 lines?
let currentOrange = oranges[currentOrangeIndex];
let x = window.innerWidth * currentOrange.x;
let y = currentOrange.y;


//FUNCTION LOOP//
// Code that runs over and over again
function loop() {
 y += fallSpeed; 
 Util.setPositionPixels(x, y, orange);

// get the orange's actual position on screen
const orangeRect = orange.getBoundingClientRect();

// only reset when orange is completely below the screen
if (orangeRect.top > window.innerHeight /*|| collision = true*/ ){
//alert ("Game Over!");
resetOrange();
}

//if (y > window.innerHeight /*|| collision = true*/ ){
//alert ("Game Over!");
//resetOrange();
//} 

  Util.setPositionPixels(px, window.innerHeight *0.65, player)

  window.requestAnimationFrame(loop);
}

function eatOrange(){  
  Util.setColour(40, 100, 50, 0, orange);
}

function resetOrange(){
  // pick a random orange position from array
 currentOrangeIndex = Math.floor(Math.random()* oranges.length);
 currentOrange = oranges[currentOrangeIndex];

 //reset orange position on top
 x = window.innerWidth * currentOrange.x;
 y = 0;

 //make orange visible again
 Util.setColour(40, 100, 50, 1, orange);

 //increase the speed of every new orange
 fallSpeed += 0.2;
}

function playerCaughtOrange(){
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

  console.log(`${prevIndex} -> ${currIndex}`);

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

  console.log('Reset key presses.');
}

//FUNCTION SETUP//
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here

//properties of player (the purple rectangle)
Util.setColour(270, 100, 50, 0.5, player);
Util.setRoundedness(0, player);
Util.setSize(180,300, player);

//properties of orange
Util.setColour(35, 100, 50, 1, orange);
Util.setRoundedness(1, orange);
Util.setSize(80, 80, orange);
Util.setPositionPixels(x, y, orange);


  //tap KeyE to eat orange
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE' && playerCaughtOrange()){
      eatOrange();
      resetOrange();
    }
  })

  //swipe the row(KeyA-KeyL) to move the player left and right
  document.addEventListener('keydown', (event) => {
    clearTimeout(timeoutID);

    prevKey = currKey;
    currKey = event.code;

    let dir = swipeDirection();
    px += dir*50;
    Util.setPositionPixels(px, window.innerHeight *0.6, player)
  })

//
  document.addEventListener('keyup', (event) => {
    timeoutID = setTimeout(resetKeys, 75);
  })

// start countdown timer
  timerInterval = setInterval(() =>{
  timeLeft --;
  document.getElementById("timer").textContent = `🧡 Eat at least 10 oranges 🍊! Time left: ${timeLeft} `;

  if (timeLeft <=0){
    clearInterval(timerInterval);
    gameOver();
  }
}, 1000); // counting down every 1 second



function winGame(){
  alert("You win! Enjoy the oranges that you caught! :D")
}

function gameOver(){
  alert("Game Over! Try again! :)")
}
  

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!