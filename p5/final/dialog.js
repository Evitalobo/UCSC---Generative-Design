//dialog.js
/*a DialogBox class  with the necessary properties and methods
 to draw an interactive dialog box on the screen with text and/or
  shapes within the boundaries of the box.
This class should support affirmative sentences as well as questions
 with yes/no answers.  To answer a question, the player should press "y" or "n".
All the text and/or shapes drawn are assumed to fit on this dialog 
box, so you don't have  to implement scrolling or paging.
*/

class DialogueBox {
    constructor() {
    	
    }


	 drawDialog(){
	 	stroke(2);
	 	fill(255, 255, 255 ,150);
	 	rect(width/2 ,height/2  , width/2 +400,height -50);
	 	let s = ">Would you want an abstract art piece today? Press 'y' or 'n'";
	 	 textSize(30);
	 	 fill(0);
	 	 textAlign(CENTER);
	 	text(s,width/2,70);

	 }
}

