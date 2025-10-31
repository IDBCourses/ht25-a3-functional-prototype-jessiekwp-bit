/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let player = Util.thing;
let orange0;

let px = (window.innerWidth*0.5);


let oranges = [
  "orange0", 
  "orange1", 
  "orange2",
  "orange3",
  "orange4",
  "orange5",
  "orange6",
  "orange7",
  "orange8",
  "orange9",
];

//let orange = {
//  hue: 40,
//  size: 100,
//}



//let gameOver = false; 


// Settings variables should contain all of the "fixed" parts of your programs



// Code that runs over and over again
function loop() {


//if (y > window.innerHeight){
//  gameOver = true
//} else {
//  y +=0.5;
//}

//function gameOver(){
//}

  window.requestAnimationFrame(loop);
}


// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here

//properties of rectangle (the player)
Util.setColour(270, 100, 50, 0.5, player);
Util.setRoundedness(0, player);
Util.setSize(120,200, player);
Util.setPositionPixels(window.innerWidth*0.5, window.innerHeight*0.6, player);

//properties of orange1
orange0 = Util.createThing();
Util.setColour(40, 100, 50, 1, orange0);
Util.setRoundedness(1, orange0);
Util.setPositionPixels(window.innerWidth*0.2, window.innerHeight*0, orange0);
Util.setSize(100, 100, orange0);


  

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
