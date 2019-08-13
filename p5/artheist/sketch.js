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













