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
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);


}

function draw() {
//draw ellipse character here

if (state === "map"){
	clear();
	drawMap();
}else if ( state === "dialog"){
	dBox.drawDialog();
	noLoop();
}

}

function drawMap(){
	fill(0,20,240);
ellipse(playX,playY,20);



let d = int(dist(playX, playY, npc.X, npc.Y));


	if (d <= pNPCdist) {
		fill(240,240,20);
		canInteract =true;
	}else{
		fill(0);
		canInteract = false;
	}
	npc.run();
}

function drawArt(){
	   // Lsystem attributes
    let axiom = "F";
    let rules = {"F": "FG[-F+F]",
    			 "G": "F+G[FG]"  };

    GenGram = new GenerativeGrammar(rules); //include probability
    let s = GenGram.expand(axiom,random(1,5));
    GenGram.drawString(s, random(1, 180));

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
