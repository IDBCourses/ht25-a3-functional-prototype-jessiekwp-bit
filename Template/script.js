/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let player = Util.thing;
let orange = Util.createThing();

let px = (window.innerWidth*0.5);

let oranges = [
  {x: 0.2, y:0},
  {x: 0.5, y:0},
  {x: 0.7, y:0},
  {x: 0.3, y:0},
  {x: 0.9, y:0},
];

for(let i=0; i <5; i++){  //for loop 
  oranges.push({x: Math.random(), y:0});
}

let currentOrangeIndex = 0; 
let currentOrange = oranges[currentOrangeIndex];
let x = window.innerWidth * currentOrange.x;
let y = currentOrange.y;

let fallSpeed = 4.5;


// Settings variables should contain all of the "fixed" parts of your programs


// Code that runs over and over again
function loop() {
y += fallSpeed; 
Util.setPositionPixels(x, y, orange);


if (y > window.innerHeight /*|| collision = true*/ ){
  //alert ("Game Over!");
  addOrange();
} 

  window.requestAnimationFrame(loop);
}

function addOrange(){
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
Util.setSize(100, 100, orange);
Util.setPositionPixels(x, y, orange);

//setInterval(addOrange, 4000); // add an orange every 4 seconds

//tap KeyE to eat orange
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      eatOrange();
    }
  })

  

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
