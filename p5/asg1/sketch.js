

//sketch.js
/*
When sound is louder, the circles expand to a bigger size- trying to simulate rain
Adapted from Nature of Code example from chapter 4 - moving particle system
*/

let ps;

let soundFile;
let amplitude;
let mapMax = 1.0;
let fft;
let smoothing = 0.8; // play with this, between 0 and .99
let binCount = 1024; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
let particles =  new Array(binCount);



function preload(){

	  soundFile = loadSound('thunder.wav');
}



function setup() {
  let start = createCanvas(640, 360);
  fill(0);
  start.mouseClicked(togglePlay);

  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(soundFile);
  soundFile.amp(1.0);

  ps = new ParticleSystem(createVector(width , 500));
  
	


  // initialize the FFT, plug in our variables for smoothing and binCount
 

  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);


   // instantiate the particles.
  for (let i = 0; i < particles.length; i++) {
    let x = map(i, 0, binCount, 0, width * 2);
    let y = random(0, height);
    let position = createVector(x, y);
    particles[i] = new Particle(position);
  }


}

function draw() {
  background(200);

  
 ps.run();
 ps.addParticle(mouseX, mouseY);
// returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze(binCount);

  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum. 
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
	  for (let i = 0; i < binCount; i++) {
	    let thisLevel = map(spectrum[i], 0, 255, 0, 1);
	    
	    // update values based on amplitude at this part of the frequency spectrum
	    particles[i].update( thisLevel );

	   // particles[i].update( random(0,1) );
	    // draw the particle
	    particles[i].display();

	    // update x position (in case we change the bin count while live coding)
	    particles[i].position.x = map(i, 0, binCount, 0, width * 2);


	  // Option #1 (move the Particle System origin)
	  //ps.origin.set(mouseX, mouseY, 0);

	  //ps.addParticle();
	 
	  
	  //let ellipseHeight = map(level, 0, mapMax, height, 0);
	 

	}


}

function togglePlay(){
		if(soundFile.isPlaying()){
			soundFile.pause();
		}else{
		soundFile.loop();
		}
	}