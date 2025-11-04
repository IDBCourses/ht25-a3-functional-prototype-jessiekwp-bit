/*
 * IDB Programming: Code Playground
 *
Game: "Orange Catcher 🍊"
Developer: Wan Pui Kwok
Game rules: Please refer to README
*/
  
import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let player = Util.thing; //player is the girl
let orange = Util.createThing();
let oranges = []; //create an empty array to store orange objects
let fallSpeed = 2; //how fast the orange falls (pixels per frame)
let prevKey = null; //keeps track of the previous keyboard key pressed
let currKey = null; //keeps track of the current keyboard key pressed
let timeoutID = null; //stores the timeout ID used to reset key presses after a delay
let px = (window.innerWidth*0.5); //player's x-position
let timeLeft = 20; //countdown timer in seconds
let timerInterval; //store interval ID returned by setInterval() - to store the timer later
let nOranges = 0; //number of oranges eaten is 0 at the beginning
let isGameOver = false; //game is not over yet at the beginning of the game


//CONSTANT VARIABLES//
// Settings variables should contain all of the "fixed" parts of your programs

const orangeXPos = [0.2, 0.9, 0.5, 0.3, 0.7, 0.1, 0.8, 0.4, 0.1, 0.6];
//an array of the x-positions of the orange

const row = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
//an array of the keys of the row on the keyboard

const orangesDisplay = document.getElementById("orangesDisplay");
//find the html element "orange display"

for(let i=0; i < orangeXPos.length; i++){ 
  oranges.push({x: orangeXPos[i], y:0});
}
//for loop: use the x-positions to create orange objects and add them to the oranges array

let currentOrangeIndex = Math.floor(Math.random()* oranges.length); 
/*the first orange starts at a random x-position every time
Math.randon() gives a random number between 0-1, then times the oranges' length to get a bigger number
Math.floor rounds the number down to generate an integer index between 0-9*/
let currentOrange = oranges[currentOrangeIndex]; //pick that orange
let x = window.innerWidth * currentOrange.x; //x-position of each random orange
let y = currentOrange.y; //y-position of each random orange, which is always 0


//FUNCTION LOOP//
// Code that runs over and over again
function loop() {
  y += fallSpeed; //the orange falls vertically at the speed of 2 pixels per frame initially
  Util.setPositionPixels(x, y, orange); 
  //the orange keeps changing its position inside the loop

const orangeRect = orange.getBoundingClientRect();
//get the orange's actual position on screen

if(orangeRect.top > window.innerHeight && !isGameOver ){
resetOrange();
} //reset orange when it goes below the screen and when game is not over yet

  Util.setPositionPixels(px, window.innerHeight *0.65, player)
  //the position of the player keeps changing in the game

  if(!isGameOver){
    window.requestAnimationFrame(loop);
  } //as long as game is not over yet, keep running the game
}

function eatOrange(){  
  Util.setColour(35, 100, 50, 0, orange);
} //opacity is changed to 0 because the orange is "eaten" (becomes invisible)

function resetOrange(){
 currentOrangeIndex = Math.floor(Math.random()* oranges.length);
 currentOrange = oranges[currentOrangeIndex];
 //pick a random orange position from the array every time the orange is reset

 x = window.innerWidth * currentOrange.x;
 //reset orange position at a new x-position
 y = 0; //reset orange position at the top of the window

 Util.setColour(35, 100, 50, 1, orange);
  //opacity:1 -> make orange visible again

 fallSpeed += 0.25; //increase the speed of every "new" orange by 0.25 pixels per frame
}

function collision(){
 const orangeRect = orange.getBoundingClientRect();
 const playerRect = player.getBoundingClientRect();
 return(
  orangeRect.right >= playerRect.left &&
  orangeRect.left <= playerRect.right &&
  orangeRect.bottom >= playerRect.top &&
  orangeRect.top <= playerRect.bottom
 );
 //this function detects if orange is anywhere inside the player, also means all 4 conditions are satisfied
 //then return the value that they are satisfied 
}

function swipeDirection(){
  let prevIndex = row.indexOf(prevKey);
  let currIndex = row.indexOf(currKey); 
  if(currIndex < 0 || prevIndex < 0){
    return 0; //nothing happens if pressing any key outside the row of KeyA-KeyL. 0 means invalid
  } else {
    let diffIndex = currIndex - prevIndex;

    if(diffIndex > 1 || diffIndex < -1){
      return 0; 
    //to prevent skipping any key in between, because it's a swipe, so the value should be 1 or -1
    } else {
      return diffIndex;
    }
  } 
}

function resetKeys(){
  prevKey = null; //reset the previous key pressed, clear any stored value
  currKey = null; //reset the current key pressed so no direction is registered
}

function winGame(){
  clearInterval(timerInterval); //stop the countdown after winning the game
  isGameOver = true; //stop the loop of falling orange
  alert("🍊🍊🍊🍊You win! You are the best 'Orange Catcher'! 🍊🍊🍊🍊") //show the win message
}  

function gameOver(){
  clearInterval(timerInterval); //stop the timer after game over
  isGameOver = true; //stop the loop of falling orange
  alert("Game over! Eat again! :)🍊") //show the lose message
}


//FUNCTION SETUP//
// Setup is run once, at the start of the program. It sets everything up for us!
function setup(){

//properties of player
Util.setColour(0, 0, 100, 0, player); //it is transparent so only the image of player(the girl) is visible
Util.setRoundedness(0, player);
Util.setSize(160,300, player);

//properties of orange
Util.setColour(35, 100, 50, 1, orange);
Util.setRoundedness(1, orange);
Util.setSize(55, 55, orange);
Util.setPositionPixels(x, y, orange);


  // Put your event listener code here
  document.addEventListener('keydown', (event) => {
    if(event.code === 'KeyE' && collision()){
      if(isGameOver) return; //if game is over, stop this event
      eatOrange(); //orange can be eaten when orange collides with player and KeyE is tapped
      nOranges ++; //then thet number of oranges is increased by 1
      orangesDisplay.textContent = `(っ˘ڡ˘ς) Eaten oranges: ${nOranges} 🍊`;
      //text displayed at top left corner: show the number of eaten oranges

      resetOrange(); //a new orange is being launched after the previous one is being 'eaten'
      if(nOranges === 10){ 
        setTimeout(winGame, 100); //winning condition: Eat 10 oranges. The game ends there.
        //create 0.1 second delay so "10" can be displayed when win game
      }
    }
  })

  //swipe the row(KeyA-KeyL) to move the player left and right
  document.addEventListener('keydown', (event) => {
    if(isGameOver) return; //if game is over, stop this event
    clearTimeout(timeoutID); //stop the key reset timer because a new key is pressed now
    prevKey = currKey; //store the previous key pressed
    currKey = event.code; //store the current key pressed
    let dir = swipeDirection(); //if -1, go left; if 1, go right; 0 is invalid so no movement
    px += dir*50; //the player moves 50 pixels per key swipe
    //either 1*50 or -1*50
  })

  document.addEventListener('keyup', (event) => {
    if(isGameOver) return;//if game is over, stop this event
    timeoutID = setTimeout(resetKeys, 75);
    //75 ms is very short so the program can still remember the previous key and perform swipe
  })//if the gap between two key presses is longer than 75 ms, the previous key will be forgotten

//start countdown timer
  timerInterval = setInterval(() =>{
  timeLeft --; //countdown every second
  document.getElementById("timer").textContent = `🧡Goal: Eat 10 oranges in 20 seconds 🍊! Time left: ${timeLeft} `;
  //text displayed at top left corner: goal and countdown
  
  if(timeLeft <=0 && nOranges <10){ //If player already has 10 oranges, skip gameOver completely
    setTimeout(gameOver, 100);
    //create 0.1 second delay so the time left displayed is accurate
  }
}, 1000); // the interval is 1 second - counting down every second

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!