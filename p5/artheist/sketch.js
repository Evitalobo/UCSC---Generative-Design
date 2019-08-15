

let bg;
let playImg;
let water;
let npcImg;
let cactus;


function preload(){
//game imgs
   bg = loadImage('gameimg/bg.jpeg');
   playImg = loadImage('gameimg/player.png');
   npcImg = loadImage('gameimg/npc.png');
    water = loadImage('gameimg/water.jpeg');
    cactus =loadImage('gameimg/cactus.png');



  
}

/* SETUP */
function setup(){
    //p5
    
   // bg = loadImage('gameimg/bg.jpeg');
    createCanvas(600, 400);
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
      //console.log(bg);
        background(bg);
        //lava
        drawWater();
        //music viz
        if (roll) renderMusic(roll);
        //NPC
      
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
  	  let rollArr = roll.split("."),
        end = Math.min(width, rollArr.length),
        h = height / 128;
        let inc=50;//increment x offset
    for (let x=0; x<end; x++){
        let note = rollArr[x].trim();
        if (!note.length) continue;
        let noteArr = note.split(" ");
        noteArr.forEach(note => {
            let [pitch, w] = note.split("_"),
                y = map(pitch, 20, 100, 0, height-40);
            //fill("green");
            //rect((x + 60) + inc, y, w , h + 2 );
            image(cactus,((x + 60) + inc),y );
            inc= inc + 20;
        });
    }
}

/* PLAYER MOVEMENT */
var player = {};

function setupPlayer(){
	player.x = 0;
    player.y = height/2;
    player.radius = 25;
    player.vx = 0;
    player.vy = 0;
    player.maxSpeed = 2;
    player.acceleration = 0.25;
   // texture(playerImg);
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
    if ((c1[0] === 0 && c2[1] > 165 && c2[2] > 165) ||
        (c2[0] === 0 && c2[1] > 165 && c2[2] > 165) ||
        (c3[0] === 0 && c3[1] > 165 && c3[2] > 165) ||
        (c4[0] === 0 && c4[1] > 165 && c4[2] > 165)){
          if (roll) createPianoRoll();
      	  changeNoise();
    }
    if ((c1[0] < 10 && c2[1] > 0 && c2[2] < 20) ||
        (c2[0] < 10 && c2[1] > 0 && c2[2] < 20) ||
        (c3[0] < 10 && c3[1] > 0 && c3[2] < 20) ||
        (c4[0] < 10 && c4[1] > 0 && c4[2] < 20)){
          player.acceleration =0.1;
          player.maxSpeed = 0.5;
        
    }
}

function playerDraw(){
	//fill(player.color);
  	//ellipse(player.x, player.y, player.radius);
     image(playImg, player.x, player.y);
}

/* DIALOG */
function drawDialog(){
	background(255);
    stroke(2);
    fill(255, 255, 255 ,150);
    //rect(width/2 ,height/2  , width/2 +400,height -50);
    let s = ">Thank you for saving me, would you like some art as a gift? Press 'y' or 'n'";
    textSize(12);
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
          let s = ">Thank you for saving me, would you like some art as a gift? Press 'y' or 'n'";
    textSize(12);
    fill(0);
    textAlign(CENTER);
    text(s,width/2,70);
    }
  	else if (keyCode === 78){ //"n"
    	//return to map
      	state = "map";
      	setupPlayer();
        setupNPC();
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
    GenGram.drawString(s1, random(200, 360) );
    GenGram.drawString(s2, random(90, 360) );
    //GenGram.drawString((s1-s2), sin(300));
}

/* PERLIN ANIMATION */
let t = 0, tIncrement = 0.005,
    redThreshold = 165,
    gridSize = 7;

function changeNoise(){
	noiseSeed(Math.random()*100);
}

function drawWater(){
	//lava floor
    for (let x=60; x<width; x+=gridSize){
      for (let y=0; y<height; y+=gridSize){
        let noiseVal = noise(x/100, y/100, t),
            hue = Math.floor(noiseVal * 255);
        if (hue >= redThreshold){
        
        fill(0, hue, hue);
        noStroke();
        rect(x, y, gridSize, gridSize);
       // image(water, x, y);
        } 

      }
    }
    t += tIncrement;
}

/* PLATFORM/NPC */
let npc = {}, state = "map";

function setupNPC(){
	npc.x = random(100,width - 200);
  	npc.y = random(100,height/2 - 50);
  	npc.radius = 30;
  	npc.color = "cyan";
}


function drawNPC(){
	//fill(npc.color);
  	//ellipse(npc.x, npc.y, npc.radius);
    image(npcImg, npc.x, npc.y);
}

function playerNPCcollision(){
	let d = dist(player.x, player.y, npc.x, npc.y);
  	if (d < player.radius + npc.radius){
    	state = "dialog";
    }
}













