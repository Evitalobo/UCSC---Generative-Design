//markov.js
//Implement (in "markov.js") a Markov Chain class which supports training a markov chain on a given 
//dataset and sampling from it to generate new pieces on the style of the dataset.

class Markhov {
	constructor(data){
    	//data is array of strings
      	this.model = {};
      	this.prevBeat = null;
      	data.forEach(str => this.addToModel(str));
    }
  	addToModel(str){
        str = str.trim();
    	//str values separated by a space
      	let beats = str.split(" ");
      	this.prevBeat = "#";
      	beats.forEach((beat, index, arr) => this.addBeat(beat, index, arr));
    }
  	addBeat(beat, index, arr){
      	if (!this.model[this.prevBeat]) this.model[this.prevBeat] = [];
      	this.model[this.prevBeat].push(beat);
    	if (index === arr.length-1){
        	//last beat of song
          	if (!this.model[beat]) this.model[beat] = [];
            this.model[beat].push("#");
        }
      	else {
        	this.prevBeat = beat;
        }
    }
  	create(){
      	let maxLength = 140;
      	let currBeat = "#";
      	let str = "";
      	for (let i=0; i < maxLength; i++){
        	let nextBeat = this.getNext(this.model[currBeat]);
          	if (nextBeat === "#") break;
          	str += nextBeat + " ";
          	currBeat = nextBeat;
        }
      	return str.trim();
    }
  	getNext(arr){
    	let rand = Math.floor(Math.random() * arr.length);
      	return arr[rand];
    }
}

  	
