/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing, Util.createThing(), Util.createThing()];
//const thing1x = 43290;


// Settings variables should contain all of the "fixed" parts of your programs
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

Util.setPositionPixels(window.innerWidth*0.2, window.innerHeight*0.2, things[1]);
Util.setColour(1,100,35,1, things[1]);
Util.setRoundedness(0, things[1]);
Util.setSize(100, things[1]);
Util.setRotation(135, things[1]);

Util.setPositionPixels(window.innerWidth*0.8, window.innerHeight*0.8, things[2]);
Util.setColour(1,100,75,1, things[2]);
Util.setRoundedness(0, things[2]);
Util.setSize(100, things[2]);
Util.setRotation(135, things[2]);


Util.setPosition(position, things[1]);

Util.setPosition(position, things[2]);


function updateXY(){
  x = event.x / window.innerWidth;
  y = event.y / window.innerHeight;
}

  window.requestAnimationFrame(loop);
}

function DarkRubyGoesUp(){
  y.position, things[1] -= 1;
  //timeoutID = setTimeout(grow, 10);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
 


  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
