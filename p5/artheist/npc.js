//npc.js
/*a NPC with the necessary properties and methods to generate 
a short piece of art of your choice given a axiom as input.
Use your GenerativeGrammar class to expand this axiom. 
Implement a method to interpret the expanded string as either drawing, story or music.
Use your DialogBox class to display the generated content.
*/


class NPC{
	constructor (){
		this.X = npcX;
		this.Y = npcY;
		this.S = npcSize;
	}

	run(){
		this.display();
	}

	display(){
	rectMode(CENTER);
	rect(this.X,this.Y,this.S,this.S);
	}	
}