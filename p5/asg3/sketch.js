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

let playX = 200;
let playY = 200;
let playSpeed =15;
let pNPCdist = 50;
let state = "map";

let canInteract = false;

let GenGram; //GenerativeGrammar class
let dBox; //DialogueBox class
let npc = new NPC(); //NPC class


function setup() {
	background(0);
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(1);


}

function draw() {
//draw ellipse character here
if (state === "map"){
	clear();
	background(0);
	drawMap();
}else if ( state === "dialog"){
	dBox.drawDialog();
	noLoop();
}

}
//redraws map
function drawMap(){
	fill(0,20,240);
ellipse(playX,playY,20);


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

//MOVEMENT    

  //D key moves to right side
   if (key =='d'){
       playX= playX + playSpeed;
    
   //console.log("d key:");
    }
    //A key moves to left side
     if (key =='a'){
         playX = playX - playSpeed;
       
   //console.log("a key:");
    }
    //W key moves forward
     if (key =='w'){
      playY= playY - playSpeed;
   
  // console.log("w key:");
    }
    //S key moves backward
    if (key =='s'){
       playY= playY + playSpeed;
   //console.log("s key:");
    }
  }

