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


let GenGram;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);

    // Lsystem attributes
    let axiom = "F";
    let rules = {"F": "F-F[-F+F]+F[+F-F]+ GF-F+G-F[G]"};

    GenGram = new GenerativeGrammar(rules);
    let s = GenGram.expand(axiom, 5);
    GenGram.drawString(s, 25);
}

function draw() {
//draw ellipse character here


}


function keyPressed() {
	//set variables for 2D movement
    if (key >= 'a' && key <= 'z') {
      keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    }

  //D key moves to right side
   if (key =='d'){
       sideY= sideY +5;
       sideX= sideX -5;
       eyeY = eyeY +5;
       eyeX= eyeX -5;
   //console.log("d key:");
    }
    //A key moves to left side
     if (key =='a'){
         sideY= sideY -5;
         eyeY = eyeY -5;
         sideX= sideX +5;
         eyeX= eyeX +5;
   //console.log("a key:");
    }
    //W key moves forward
     if (key =='w'){
       sideX= sideX +5;
       sideY= sideY +5;
       eyeX = eyeX +5;
       eyeY = eyeY +5; 
  // console.log("w key:");
    }
    //S key moves backward
    if (key =='s'){
       sideX= sideX -5;
       sideY= sideY -5;
       eyeX = eyeX -5;
       eyeY = eyeY -5;
   //console.log("s key:");
    }
  }

