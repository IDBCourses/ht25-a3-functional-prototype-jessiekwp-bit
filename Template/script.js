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
let initialFallSpeed = 2;

let prevKey = null;
let currKey = null;
let timeoutID = null;
let px = (window.innerWidth*0.5);


// Settings variables should contain all of the "fixed" parts of your programs
//const numRandomOranges = 5;
const orangeXPos = [0.2, 0.9, 0.5, 0.3, 0.7, 0.1, 0.8, 0.4, 0.1, 0.6];
const row = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];

for(let i=0; i < orangeXPos.length; i++){  //for loop 
  oranges.push({x: orangeXPos[i], y:0});
}

let currentOrangeIndex = 0; //can simplify these 4 lines?
let currentOrange = oranges[currentOrangeIndex];
let x = window.innerWidth * currentOrange.x;
let y = currentOrange.y;

// Code that runs over and over again
function loop() {
y += initialFallSpeed; 
Util.setPositionPixels(x, y, orange);


if (y > window.innerHeight /*|| collision = true*/ ){
  //alert ("Game Over!");
  resetOrange();
} 

  Util.setPositionPixels(px, window.innerHeight *0.85, player)

  window.requestAnimationFrame(loop);
}

function resetOrange(){
  // pick a random orange position from array
 currentOrangeIndex = Math.floor(Math.random()* oranges.length);
 currentOrange = oranges[currentOrangeIndex];

 //reset orange position on top
 x = window.innerWidth * currentOrange.x;
 y = 0;
}

function eatOrange(){
  Util.setColour(40, 100, 50, 0, orange);
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

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here

//properties of rectangle (the player)
Util.setColour(270, 100, 50, 0.5, player);
Util.setRoundedness(0, player);
Util.setSize(120,200, player);
Util.setPositionPixels(px, window.innerHeight * 0.85, player);

//properties of orange0
Util.setColour(40, 100, 50, 1, orange);
Util.setRoundedness(1, orange);
Util.setSize(80, 80, orange);
Util.setPositionPixels(x, y, orange);


//tap KeyE to eat orange
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      eatOrange();
    }
  })

  //swipe the keyboard row(KeyA-KeyL) to move the player left and right
    //document.addEventListener()
  document.addEventListener('keydown', (event) => {
    clearTimeout(timeoutID);

    prevKey = currKey;
    currKey = event.code;

    console.log(`${prevKey} -> ${currKey}`);

    let dir = swipeDirection();
    px += dir*50;
    Util.setPositionPixels(px, window.innerHeight *0.85, player)
  })

  document.addEventListener('keyup', (event) => {
    timeoutID = setTimeout(resetKeys, 75);
  })
  

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!

