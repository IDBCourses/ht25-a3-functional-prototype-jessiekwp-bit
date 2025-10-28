/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let things = [Util.thing, Util.createThing];

// Settings variables should contain all of the "fixed" parts of your programs


// Code that runs over and over again
function loop() {
Util.setPositionPixels(window.innerWidth/2, window.innerHeight/2, things[0]);
Util.setColour(270,100,80,0.5, things[0]);
Util.setRoundedness(0);
Util.setSize(100);
Util.setRotation(135, things[0]);

Util.createThing()
Util.setColour(270,100,80,0.5, things[1]);


  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here





  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
