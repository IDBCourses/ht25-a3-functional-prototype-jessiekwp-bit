/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing, Util.createThing(), Util.createThing()];
let x = (window.innerWidth*0.2);
let y = (window.innerHeight*0.2);


// Settings variables should contain all of the "fixed" parts of your programs
//const thing1x = 43290;

//things[0] = Util.thing;
Util.setPositionPixels(window.innerWidth*0.5, window.innerHeight*0.5, things[0]);
Util.setColour(1,100,50,1, things[0]);
Util.setRoundedness(0);
Util.setSize(100);
Util.setRotation(135, things[0]);

//things[0] = RedRuby
//things[1] = DarkRuby
//things[2] = LightRuby

// Code that runs over and over again
function loop() {

Util.setPositionPixels(x, y, things[1]);
Util.setColour(1,100,35,1, things[1]);
Util.setRoundedness(0, things[1]);
Util.setSize(100, things[1]);
Util.setRotation(135, things[1]);

Util.setPositionPixels(window.innerWidth*0.8, window.innerHeight*0.8, things[2]);
Util.setColour(1,100,75,1, things[2]);
Util.setRoundedness(0, things[2]);
Util.setSize(100, things[2]);
Util.setRotation(135, things[2]);


  window.requestAnimationFrame(loop);
}

function DarkRubyGoesDown(){
  Util.setPositionPixels(x, y +=10, things[1]);
}



// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here

  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyC'){
      console.log(`Key Down: Code ${event.code} | Key ${event.key}`);
      DarkRubyGoesDown();
    }
  })
 


  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
