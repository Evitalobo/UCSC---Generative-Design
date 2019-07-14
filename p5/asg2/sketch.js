//sketch
//a world generator and generate a world of size at least equal
//to w = 32, h = 32 and d = 32.

  //let worldSize =  new Array(999999999);
  let world;
  let side=200;
  let up=0;
  let cam;
let forward= -400;


function setup() {
  createCanvas(500,500,WEBGL);
  frameRate(60);
  //pixelDensity(1);
  fill(0);

  //noiseSeed(99);
  cam = createCamera();
  cam.move(50,50,-110);
  cam.lookAt(0,-200,0);
/*
  let tiltAng= map(mouseX,0,500,0,2*PI)
  cam.tilt(tiltAng);

  // set initial tilt angle
  let panAng= map(0,mouseY,500,0,2*PI)
    cam.pan(panAng);
  */
 //cam.tilt(mouseY);
  world = new WorldGenerator(this.seed, 32, 32, 32); 

  //cam(;

}


function draw() {
  clear();

  //camera(side,-200,forward,0,0,0,0,0,0);
  world.run();

  //  let tiltAng= map(mouseX,0,500,0,2*PI)
  //cam.tilt(tiltAng);
  //cam.tilt()
  
  let dx = -(pmouseX - mouseX)/10.0;
  let dy = -(pmouseY - mouseY)/10.0;
  cam.pan(dx);
  cam.tilt(dy);

/*
  //Mouse rotation
  if(mouseX >= 250){
    cam.tilt(.01);
  }else if (mouseX < 250){
    cam.tilt(-0.01);
  }

  if(mouseY >= 250){
    cam.pan(.01);
  }else if (mouseY < 250){
    cam.pan(-0.01);
  }
  
 //  cam.pan(-.01); 
   
  // cam.setPosition(x, y,z);
//console.log(cam);

*/

//camera(0, 0, 0, 0, 0, 0, 0, 4, 0);

 //  7 camera(mouseX, mouseY, side, 0, 0, 0, 0, 4, 0);
 // worldSize[i];.display();

if (key == 'a') {
cam.move(0,50,-50);
console.log("A key:");

}


}

  // key <= 'z') {

//let camera = vector 