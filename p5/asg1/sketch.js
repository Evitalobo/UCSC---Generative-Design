

//sketch.js
/*
When sound is louder, the circles expand to a bigger size- trying to simulate rain
Adapted from https://therewasaguy.github.io/p5-music-viz/ example posted on canvas
*/

let ps;

let soundFile;
let amplitude;
let mapMax = 1.0;
let fft;
let smoothing = 0.9; // Can adjust level of shifting into a size
let soundScale = 1024; // Size of FFT array
let particles =  new Array(soundScale);

function preload(){
		//preload music
	  soundFile = loadSound('thunder.wav');
}

function setup() {
  let start = createCanvas(300, 400);
  fill(0);
  start.mouseClicked(togglePlay);

//initialize FFT and set the amplitude
  fft = new p5.FFT(smoothing, soundScale);
  fft.setInput(soundFile);
  soundFile.amp(1.0);
  //vector to hold length of particle system
  ps = new ParticleSystem(createVector(500 , 50));
  
  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);


   // instantiate particle system
  for (let i = 0; i < particles.length; i++) {
    let x = map(i, 20, soundScale, soundScale, 600);
    let y = random(0, height);
    let position = createVector(x, y);
    particles[i] = new Particle(position);
  }
}

function draw() {
	//black bg
  background(0);
 ps.run();
 ps.addParticle(mouseX, mouseY);
// returns an array with [soundScale] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze(soundScale);

  // Each particle is on the soundScale and uses a different energy based on the amplitude of the sound
	  for (let i = 0; i < soundScale; i++) {
	    let thisLevel = map(spectrum[i], 0, 255, 0, 1);
	    
	    // update values based on amplitude at each frame
	    particles[i].update( thisLevel );
	    // draw the particle
	    particles[i].display();
	    // update x position
	    particles[i].position.x = map(i, 0, 500, 0, 600);
	}
}

//Click to toggle music
function togglePlay(){
		if(soundFile.isPlaying()){
			soundFile.pause();
		}else{
		soundFile.loop();
		}
	}