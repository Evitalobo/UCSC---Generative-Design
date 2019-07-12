//sketch
//a world generator and generate a world of size at least equal
//to w = 32, h = 32 and d = 32.

  //let worldSize =  new Array(999999999);
  let world;
  let side=0;
  let up=0;
  let cam;



function setup() {
  createCanvas(500,500,WEBGL);
  frameRate(60);
  pixelDensity(1);
  fill(0);
  //noiseSeed(99);
   cam = createCamera();
   

  // set initial tilt angle
  cam.tilt(0);
  cam.pan(0);
 //cam.tilt(mouseY);
  world = new WorldGenerator(this.seed, 32, 32, 32); 

}

function draw() {
  clear();
  let tiltAng= map(mouseX,0,500,0,2*PI)
  cam.tilt(tiltAng);
   let panAng= map(0,mouseY,500,0,2*PI)
  cam.pan(panAng);
  world.run();
  // cam.setPosition(x, y,z);
console.log(cam);

//camera(0, 0, 0, 0, 0, 0, 0, 4, 0);

 //  7 camera(mouseX, mouseY, side, 0, 0, 0, 0, 4, 0);
 // worldSize[i];.display();

}

function keyPressed() {
  let keyIndex = -1;
  if (key >= 'a') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
   
  }
}


  // key <= 'z') {

//let camera = vector 