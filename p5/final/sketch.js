//sketch.js
/* an NPC and implement the necessary functions to handle the player interaction.
Player character should move with arrow keys.
When player is near (e.g. 10 pixels) the NPC, press "space" to display a dialog box.
The first message that appears is a greeting message directly followed by a question 
(e.g. "Hi, my name is Ana!" Do you want me to tell you a story?)
Player should be able to press "y" or "n" to accepted or reject.
 If "y", generate a new piece of art and display the content on the dialog box. 
 Then, ask if the player wants a new piece. If "n", close the dialog box.  
 Every new generated piece should be different given that your grammar is nondeterministic.
*/


/*

let playX = 200;
let playY = 200;
let playSpeed =15;
let pNPCdist = 50;
let state = "map";

//lava
let t = 0, tIncrement = 0.005,
    redThreshold = 165,
    gridSize = 10,
    player = {},
    wins = 0;

//markov
let isClicked = false;
const roll = "28_3 40_3 . . . . . . . 41_11 . . . . 43_4 . . . 74_3 . . 60_7 64_15 76_5 79_1 . 59_9 67_19 71_19 78_4 . . 62_1 . . 64_1 71_1 . . . 59_2 67_2 . . . . 75_1 . . . 62_2 74_1 . . . . . . 33_3 36_3 . 54_1 72_1 . . . 52_5 59_4 62_4 71_4 . . 50_1 57_4 60_4 . . . 55_31 59_31 63_31 75_2 . . . . 65_1 79_1 . . . . 39_3 . 74_13 . . . 65_2 . . . 34_7 78_7 . 55_1 . . 44_7 56_7 59_7 . . 69_1 . . . . 75_1 . . 62_1 65_1 69_4 . . . 65_42 . . 54_5 58_5 . . . . 63_1 . . . 43_7 73_1 . 66_1 73_1 76_1 . . . . . . . 64_1 . . 61_1 64_1 . 77_2 . 65_4 . . . 58_2 67_2 . 67_4 . 38_1 50_1 93_1 . . . . 36_3 48_3 57_3 62_3 82_7 . . 73_2 . 57_1 . . . . . . 61_2 64_2 . 57_3 . 40_7 51_7 . . . . . . 62_3 86_1 . . 76_1 . . . . . . . . . . 81_1 . . . 61_1 . 74_1 . . . . . . 69_1 . . 90_1 . 56_2 . 55_2 58_2 63_2 75_5 . . 75_2 . 74_3 . . 68_1 74_1 . 76_1 . . 56_4 60_4 77_18 . 36_5 52_5 56_5 . . 90_1 . 62_4 67_4 . 54_2 . . 32_3 . 81_3 84_3 . . . . 51_1 72_1 88_1 . 43_25 50_25 57_25 62_38 . 51_6 56_6 68_38 70_8 . . . . . . . 61_4 . . 69_1 73_1 . . 52_3 . . . . 81_1 . . . . . . . . . . . 68_8 . . 55_1 60_1 . . . . . . 52_1 . . . 57_1 . . . . 61_4 67_4 71_4 . . 87_5 . . . . . 39_1 60_1 . 98_1 . . . . . . . 61_1 64_1 . . . . 64_1 . . 32_18 44_18 56_18 63_19 66_19 . 52_2 . . 57_1 . . . . . . . 59_3 68_3 73_3 . 53_10 56_5 73_11 . 56_4 62_1 71_1 . . . . 61_21 66_4 78_4 . . . . 57_1 . . 45_1 76_1 . . . . 67_1 . . . 54_2 . . . . . 70_3 . . . . . 76_1 . . . . . . . 50_7 54_7 57_7 63_7 68_7 . . 72_3 76_3 . . . . 41_1 53_1 . . . . . . 88_1 . 49_1 . . . 69_1 . 75_3 80_2 83_2 87_2 . 53_1 56_1 76_1 . . . . 31_5 . . . . 70_12 . 49_3 53_3 . . . . . . . . 83_1 . . . . 57_3 78_3 . . . . . . . . . . 53_13 56_13 61_13 . . . . . . . . 74_1 . 75_4 . 41_1 . . . . . 52_3 83_22 . . . . . . . . . . . . . 62_2 . . 62_1 . 60_3 . 67_10 70_10 . . 46_1 58_1 70_1 . . . 77_7 . 33_1 . . . 55_1 . 49_8 56_8 84_8 . . . 63_3 68_3 . 62_6 64_6 71_6 . 69_2 . . . . 50_7 54_7 57_7 63_7 68_7 . . 72_3 76_3 . . . . 41_1 53_1 . . . . . . 88_1 . 49_1 . . . 69_1 . 75_3 80_2 83_2 87_2 . 53_1 56_1 76_1 . . . . 31_5 . . . . 70_12 . 49_3 53_3 . . . . . . . . 83_1 . . . . 57_3 78_3 . . . . . . . . . . 53_13 56_13 61_13 . . . . . . . . 74_1 . 75_4 . 41_1 . . . . . 52_3 83_22 . . . . . . . . . . . . . 62_2 . . 62_1 . 60_3 . 67_10 70_10 . . 46_1 58_1 70_1 . . . 77_7 . 33_1 . . . 55_1 . 49_8 56_8 84_8 . . . 63_3 68_3 . 62_6 64_6 71_6 . 69_2 . . . . 50_7 54_7 57_7 63_7 68_7 . . 72_3 76_3 . . . . 41_1 53_1 . . . . . . 88_1 . 49_1 . . . 69_1 . 75_3 80_2 83_2 87_2 . 53_1 56_1 76_1 . . . . 31_5 . . . . 70_12 . 49_3 53_3 . . . . . . . . 83_1 . . . . 57_3 78_3 . . . . . . . . . . 53_13 56_13 61_13 . . . . . . . . 74_1 . 75_4 . 41_1 . . . . . 52_3 83_22 . . . . . . . . . . . . . 62_2 . . 62_1 . 60_3 . 67_10 70_10 . . 46_1 58_1 70_1 . . . 77_7 . 33_1 . . . 55_1 . 49_8 56_8 84_8 . . . 63_3 68_3 . 62_6 64_6 71_6 . 69_2";
let button;

//npc

let canInteract = false;

let GenGram; //GenerativeGrammar class
let dBox; //DialogueBox class
let npc = new NPC(); //NPC class


function setup() {
	background(0);
    createCanvas(600, 400);
    background(0);
    noStroke();
    setupGame();
    strokeWeight(1);

    //load midi
    button = createButton('Play');
    button.position(width - 80, 20);
    button.mousePressed(onButtonClicked);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);


}
//markov player(midi)
function onButtonClicked() {
    if (button.elt.textContent === "Play"){
      button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
      button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function setupGame(){
  noiseSeed(Math.random()*100);
  player.x = 10;
  player.y = height/2;
  player.radius = 10;
  player.color = "yellow";
  player.vx = 0;
  player.vy = 0;
  player.maxSpeed = 2;
  player.acceleration = 0.15;
}

function draw() {
//draw ellipse character here
if (state === "map"){
	clear();
	background(0);
  //draw midiplayer
	drawMap();
}else if ( state === "dialog"){
	dBox.drawDialog();
	noLoop();
}





}




//redraws map
function drawMap(){
    midiPlayer.draw();
//lava floor
  for (let x=0; x<width; x+=gridSize){
    for (let y=0; y<height; y+=gridSize){
      let noiseVal = noise(x/100, y/100, t),
          red = Math.floor(noiseVal * 255);
      if (red < redThreshold) red = 0;
      fill(red, 0, 0);
      rect(x, y, gridSize, gridSize);
    }
  }
  t += tIncrement;
    //platforms
  fill("dimgrey");
  rect(0, 0, 30, height);
  rect(width-40, height/2 - 20, 40, 40);
  //player
   playerMove();
  playerAcceleration();

  fill(player.color);
  ellipse(player.x, player.y, player.radius);
  //score
  textSize(16);
  textAlign(CENTER);
  text(wins, width-20, height/2 + 4);



//	fill(0,20,240);
//ellipse(playX,playY,20);


//calculate distance
let d = int(dist(playX, playY, npc.X, npc.Y));


	if (d <= pNPCdist) {
		fill(240,240,20);
		canInteract =true;
	}else{
		fill(255);
		canInteract = false;
	}
	npc.run();

  renderMusic(roll);
}
}

//draws generative grammar
function drawArt(){
	   // Lsystem attributes
    let axiom1 = "[ACAB]ACAB";
    let axiom2 = "[CATS]";
    let rules = {"A": ["AB[-C+BB]", "T + A"], 
    			 "B": ["BS-C+[T]" , "SA"],
    			 "C": ["B+AT" , "C - T"],
    			 "T": ["T-A-T" , "[T]+B"],
    			 "S": ["-A+SS"] };

    GenGram = new GenerativeGrammar(rules); //include probability
    let s1 = GenGram.expand(axiom1,random(1,2));
    let s2 = GenGram.expand(axiom2,random(1,2));
    GenGram.drawString(s1, random(200, 360) %60);
     GenGram.drawString(s2, random(90, 360) %30);
     GenGram.drawString((s1-s2), sin(300));

}

function keyPressed() {
	//set variables for 2D movement
    if (key >= 'a' && key <= 'z') {
      keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    }
//ACTION KEYS

    //spacebar input - if player is withing distance from NPC
    if(keyCode == '32'){
    	if (!canInteract){
    		return;
    	}
    	state = "dialog";
    	dBox = new DialogueBox();
    }


    //dialoguebox responses
     if (key =='y'){
      //generate grammar
      clear();
      background(0);
      drawMap();
      	dBox.drawDialog();
       drawArt();

   //console.log("y key:");
    }
    if (key =='n'){
      state = "map";
    loop();
   //console.log("n key:");
    }
}

function onMIDIsLoaded(pianoRolls) {
    //get data for Markhov model
    let modelData = midiPlayer.pianoRolls.map(midiPlayer.pianoRoll2Text);
    //create Markhov model and feed it modelData
    let markhov = new Markhov(modelData);
    createPianoRoll();
}

function createPianoRoll(){
  //use Markhov to create string
    //let rollText = "62_4 . . . . . 61_4 64_4 . . . . . 60_4 66_4 . . . . . 59_4 67_4";
    let rollText = markhov.create();
   // console.log(rollText);
    //convert string to midi
    let midiData = midiPlayer.text2Midi(rollText);
    //convert midi to pianoRoll
    let pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration , midiData.tracks[0].notes);
    //play pianoRoll
    midiPlayer.setPianoRoll(pianoRoll, tsCallback);

    // Encode the piano roll (2D array) as string
    //let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
    //console.log(midiText);
}

function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}



//midiplayer function
function renderMusic(roll){
  let rollArr = roll.split("."),
        end = Math.min(width, rollArr.length),
        h = height / 128;
    for (let x=0; x<end; x++){
        let note = rollArr[x].trim();
        if (!note.length) continue;
        let noteArr = note.split(" ");
        noteArr.forEach(note => {
            let [pitch, w] = note.split("_"),
                y = map(pitch, 0, 127, 0, height);
            fill("white");
            rect(x, y, w, h);
        });
    }
}




//MOVEMENT    


function playerMove(){
  player.x += player.vx;
  if (player.x < player.radius) player.x = player.radius;
  if (player.x > width-player.radius) player.x = width-player.radius;
  player.y += player.vy;
  if (player.y < player.radius) player.y = player.radius;
  if (player.y > height-player.radius) player.y = height-player.radius;
  //lose?
  let p1x = player.x - player.radius - 1,
      p1y = player.y,
      p2x = player.x + player.radius + 1,
      p2y = player.y,
      p3x = player.x,
      p3y = player.y - player.radius - 1,
      p4x = player.x,
      p4y = player.y + player.radius + 1,
      c1 = get(p1x, p1y),
      c2 = get(p2x, p2y),
      c3 = get(p3x, p3y),
      c4 = get(p4x, p4y);
  if ((c1[0] > 0 && c1[1] === 0 && c1[2] === 0) ||
      (c2[0] > 0 && c2[1] === 0 && c2[2] === 0) ||
      (c3[0] > 0 && c3[1] === 0 && c3[2] === 0) ||
      (c4[0] > 0 && c4[1] === 0 && c4[2] === 0)){
    	setupGame();
  }
  //win?
  if (player.x < width-40 || player.y < height/2 - 20 || player.y > height/2 + 20) return;
  wins++;
  setupGame();
}



function playerAcceleration(){
  if (keyIsDown(65) || keyIsDown(37)){ //left
    player.vx -= player.acceleration;
    if (player.vx < -player.maxSpeed){
      player.vx = -player.maxSpeed;
    }
  }
  else if (keyIsDown(87) || keyIsDown(38)){ //up
    player.vy -= player.acceleration;
    if (player.vy < -player.maxSpeed){
      player.vy = -player.maxSpeed;
    }
  }
  else if (keyIsDown(68) || keyIsDown(39)){ //right
    player.vx += player.acceleration;
    if (player.vx > player.maxSpeed){
      player.vx = player.maxSpeed;
    }
  }
  else if (keyIsDown(83) || keyIsDown(40)){ //down
    player.vy += player.acceleration;
    if (player.vy > player.maxSpeed){
      player.vy = player.maxSpeed;
    }
  }
}




*/

/*
///========================delete

  //D key moves to right side
   if (keyIsDown(87)){
       playX= playX + playSpeed;
    
   //console.log("d key:");
    }
    //A key moves to left side
     if (keyIsDown(65)){
         playX = playX - playSpeed;
       
   //console.log("a key:");
    }
    //W key moves forward
     if (keyIsDown(68)){
      playY= playY - playSpeed;
   
  // console.log("w key:");
    }
    //S key moves backward
    if (keyIsDown(83)){
       playY= playY + playSpeed;
   //console.log("s key:");
    }
  }
*/
/* MARKOV MUSIC */
let button, roll, midiPlayer, markov;

function onButtonClicked() {
    if (button.elt.textContent === "Play"){
      button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
      button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
} 

function onMIDIsLoaded(pianoRolls) {
    //get data for Markhov model
    let modelData = midiPlayer.pianoRolls.map(midiPlayer.pianoRoll2Text);
    //create Markhov model and feed it modelData
    markov = new Markov(modelData);
    createPianoRoll();
    if (button) button.elt.removeAttribute("disabled");
}

function createPianoRoll(){
    //change music requires new midiPlayer
    midiPlayer.clear();
  //use Markhov to create string
    //let rollText = "62_4 . . . . . 61_4 64_4 . . . . . 60_4 66_4 . . . . . 59_4 67_4";
    let rollText = markov.create();
   // console.log(rollText);
    //convert string to midi
    let midiData = midiPlayer.text2Midi(rollText);
    //convert midi to pianoRoll
    let pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration , midiData.tracks[0].notes);
    //play pianoRoll
    midiPlayer.setPianoRoll(pianoRoll);
  midiPlayer.start();

    // Encode the piano roll (2D array) as string
    roll = midiPlayer.pianoRoll2Text(pianoRoll);
    //console.log(midiText);
}

/* MARKOV VISUALIZATION */
function renderMusic(roll){
    let h = height / 128,
      rollArr = roll.split(".");
    while (rollArr.length < width) rollArr = rollArr.concat(rollArr);
    for (let x=0; x<width; x++){
        let note = rollArr[x].trim();
        if (!note.length) continue;
        let noteArr = note.split(" ");
        noteArr.forEach(note => {
            let [pitch, w] = note.split("_"),
                y = map(pitch, 0, 127, 0, height);
            fill("white");
            rect(x, y, w, h);
        });
    }
}

/* PLAYER MOVEMENT */
var player = {};

function setupPlayer(){
  player.x = 10;
    player.y = height/2;
    player.radius = 10;
    player.color = "yellow";
    player.vx = 0;
    player.vy = 0;
    player.maxSpeed = 2;
    player.acceleration = 0.15;
}

function updatePlayer(){
  playerMove();
    playerAcceleration();
    playerCollision();
    playerDraw();
}

function playerMove(){
    //move player and keep it on canvas
  player.x += player.vx;
    if (player.x < player.radius) player.x = player.radius;
    if (player.x > width-player.radius) player.x = width-player.radius;
    player.y += player.vy;
    if (player.y < player.radius) player.y = player.radius;
    if (player.y > height-player.radius) player.y = height-player.radius;
}

function playerAcceleration(){
  if (keyIsDown(65) || keyIsDown(37)){ //left
        player.vx -= player.acceleration;
        if (player.vx < -player.maxSpeed){
          player.vx = -player.maxSpeed;
        }
      }
      else if (keyIsDown(87) || keyIsDown(38)){ //up
        player.vy -= player.acceleration;
        if (player.vy < -player.maxSpeed){
          player.vy = -player.maxSpeed;
        }
      }
      else if (keyIsDown(68) || keyIsDown(39)){ //right
        player.vx += player.acceleration;
        if (player.vx > player.maxSpeed){
          player.vx = player.maxSpeed;
        }
      }
      else if (keyIsDown(83) || keyIsDown(40)){ //down
        player.vy += player.acceleration;
        if (player.vy > player.maxSpeed){
          player.vy = player.maxSpeed;
        }
    }
}

function playerCollision(){
  let p1x = player.x - player.radius - 1,
        p1y = player.y,
        p2x = player.x + player.radius + 1,
        p2y = player.y,
        p3x = player.x,
        p3y = player.y - player.radius - 1,
        p4x = player.x,
        p4y = player.y + player.radius + 1,
        c1 = get(p1x, p1y),
        c2 = get(p2x, p2y),
        c3 = get(p3x, p3y),
        c4 = get(p4x, p4y);
    if ((c1[0] > 0 && c1[1] === 0 && c1[2] === 0) ||
        (c2[0] > 0 && c2[1] === 0 && c2[2] === 0) ||
        (c3[0] > 0 && c3[1] === 0 && c3[2] === 0) ||
        (c4[0] > 0 && c4[1] === 0 && c4[2] === 0)){
          if (roll) createPianoRoll();
          changeNoise();
    }
}

function playerDraw(){
  fill(player.color);
    ellipse(player.x, player.y, player.radius);
}

/* DIALOG */
function drawDialog(){
  background(255);
    stroke(2);
    fill(255, 255, 255 ,150);
    //rect(width/2 ,height/2  , width/2 +400,height -50);
    let s = ">Would you want an abstract art piece today? Press 'y' or 'n'";
    textSize(18);
    fill(0);
    textAlign(CENTER);
    text(s,width/2,70);
}

function keyPressed(){
    if (state !== "dialog") return;
  if (keyCode === 89){ //"y"
      //trigger gen art
        drawDialog();
        drawArt();
    }
    else if (keyCode === 78){ //"n"
      //return to map
        state = "map";
        setupPlayer();
    loop();
    }
}

/* GENERATIVE ART */
//draws generative grammar
function drawArt(){
     // Lsystem attributes
    let axiom1 = "[ACAB]ACAB";
    let axiom2 = "[CATS]";
    let rules = {"A": ["AB[-C+BB]", "T+A"], 
           "B": ["BS-C+[T]" , "SA"],
           "C": ["B+AT" , "C-T"],
           "T": ["T-A-T" , "[T]+B"],
           "S": ["-A+SS"] };

    GenGram = new GenerativeGrammar(rules); //include probability
    let s1 = GenGram.expand(axiom1,random(1,2));
    let s2 = GenGram.expand(axiom2,random(1,2));
    GenGram.drawString(s1, random(200, 360) %60);
    GenGram.drawString(s2, random(90, 360) %30);
    //GenGram.drawString((s1-s2), sin(300));
}

/* PERLIN ANIMATION */
let t = 0, tIncrement = 0.005,
    redThreshold = 165,
    gridSize = 10;

function changeNoise(){
  noiseSeed(Math.random()*100);
}

function drawLava(){
  //lava floor
    for (let x=0; x<width; x+=gridSize){
      for (let y=0; y<height; y+=gridSize){
        let noiseVal = noise(x/100, y/100, t),
            red = Math.floor(noiseVal * 255);
        if (red < redThreshold) red = 0;
        fill(red, 0, 0);
        rect(x, y, gridSize, gridSize);
      }
    }
    t += tIncrement;
}

/* PLATFORM/NPC */
let npc = {}, state = "map";

function setupNPC(){
  npc.x = width - 20;
    npc.y = height/2;
    npc.radius = 30;
    npc.color = "cyan";
}

function drawPlatforms(){
  fill("dimgrey");
    rect(0, 0, 30, height);
    rect(width-40, height/2 - 20, 40, 40);
}

function drawNPC(){
  fill(npc.color);
    ellipse(npc.x, npc.y, npc.radius);
}

function playerNPCcollision(){
  let d = dist(player.x, player.y, npc.x, npc.y);
    if (d < player.radius + npc.radius){
      state = "dialog";
    }
}

/* SETUP */
function setup(){
    //p5
    createCanvas(600, 400);
    background(0);
    stroke(2);
  
  //markov
    //button = createButton("Play");
    //button.position(width - 80, 20);
    //button.mousePressed(onButtonClicked);
    //button.elt.setAttribute("disabled", true);
    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
  
    //player
    setupPlayer();
  
    //npc
    setupNPC();
}

/* LOOP */
function draw(){
    if (state === "map"){
        background(0);
        //lava
        drawLava();
        //music viz
        if (roll) renderMusic(roll);
        //platforms/NPC
        drawPlatforms();
        drawNPC();
        //player
        updatePlayer();
        //NPC collision
        playerNPCcollision();
    }
    else if (state === "dialog"){
      noLoop();
        drawDialog();
    }
}








