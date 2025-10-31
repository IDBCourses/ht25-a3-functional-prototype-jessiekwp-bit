/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing, Util.createThing(), Util.createThing()];
let x = (window.innerWidth*0.2);
let y = (window.innerHeight*0);
let x2 = (window.innerWidth*0.8);
let y2 = (window.innerHeight*0.8);
let gameOver = false; 


// Settings variables should contain all of the "fixed" parts of your programs
//const thing1x = 43290;

//things[0] = Util.thing = redRuby;
Util.setPositionPixels(window.innerWidth*0.5, window.innerHeight*0.5, things[0]);
Util.setColour(0,100,50,1, things[0]);
Util.setRoundedness(0);
Util.setSize(100);
Util.setRotation(0, things[0]);


// Code that runs over and over again
function loop() {

//things[1]
Util.setPositionPixels(x, y, things[1]);
Util.setRoundedness(1, things[1]);
Util.setColour(30,100,50,1, things[1]);
Util.setSize(100, things[1]);
Util.setRotation(0, things[1]);

//things[2]
Util.setPositionPixels(x2, y2, things[2]);
Util.setColour(0,100,70,1, things[2]);
Util.setRoundedness(1, things[2]);
Util.setSize(100, things[2]);
Util.setRotation(0, things[2]);

if (y > window.innerHeight){
  gameOver = true
} else {
  y +=0.5;
}

function gameOver(){
}

  window.requestAnimationFrame(loop);
}

function darkRubyGoesDown(){
  Util.setPositionPixels(x, y +=5, things[1]);
}

function darkRubyGoesUp(){
  Util.setPositionPixels(x, y -=20, things[1]);
}

function darkRubyGoesLeft(){
  Util.setPositionPixels(x-=5, y, things[1]);
}

function darkRubyGoesRight(){
  Util.setPositionPixels(x+=5, y, things[1]);
}

function lightRubyGoesUp(){
  Util.setPositionPixels(x2, y2 -=5, things[2]);
}

function lightRubyGoesDown(){
  Util.setPositionPixels(x2, y2 +=5, things[2]);
}

function lightRubyGoesLeft(){
  Util.setPositionPixels(x2 -=5, y2, things[2]);
}

function lightRubyGoesRight(){
  Util.setPositionPixels(x2 +=5, y2, things[2]);
}

function darkRubyRotateClockwise(){
  Util.setRotation(15, things[1]);
}

//function darkRubyChangesColour(){ 
//  Util.setColour(hue += 40,100,30 ,1, things[1]); 
//} 




// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here

  //darkRuby moves in different directions
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyC'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      darkRubyGoesDown();
    }
  })

  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      darkRubyGoesUp();
    }
  })

   document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyS'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      darkRubyGoesLeft();
    }
  })

   document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyF'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      darkRubyGoesRight();
    }
  })

  //lightRuby moves in different directions
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyO'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      lightRubyGoesUp();
    }
  })

   document.addEventListener('keydown', (event) => {
    if(event.code === 'Comma'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      lightRubyGoesDown();
    }
  })

   document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyK'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      lightRubyGoesLeft();
    }
  })

  document.addEventListener('keydown', (event) => {
    if(event.code === 'Semicolon'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      lightRubyGoesRight();
    }
  })

//darkRuby changes colour
  //document.addEventListener('keydown', (event) => { 
   //if(event.code === 'KeyD'){ 
     //console.log(`Key Down: Code ${event.code} | Key ${event.key}`); 
     //darkRubyChangesColour(); 
  //} 
  //}) 

  //dark ruby rotates clockwise
  //document.addEventListener('keydown', (event) => {
    //if(event.code === 'KeyE + KeyF'){ //wanna swipe
    //  console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
    //}
    //darkRubyRotateClockwise();
  //})
 


  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
