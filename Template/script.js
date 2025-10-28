/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing, Util.createThing(), Util.createThing()];


// Settings variables should contain all of the "fixed" parts of your programs
things[0] = Util.thing;
Util.setPositionPixels(window.innerWidth*0.5, window.innerHeight*0.5, things[0]);
Util.setColour(1,100,50,1, things[0]);
Util.setRoundedness(0);
Util.setSize(100);
Util.setRotation(135, things[0]);

// Code that runs over and over again
function loop() {

things[1] = Util.createThing()
Util.setPositionPixels(window.innerWidth*0.1, window.innerHeight*0.1, things[1]);
Util.setColour(1,100,30,1, things[1]);
Util.setRoundedness(0, things[1]);
Util.setSize(100, things[1]);
Util.setRotation(135, things[1]);



  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
things[0] = Util.thing;
things[1] = Util.createThing()
things[2] = Util.createThing()





  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
