//sketch
//a world generator and generate a world of size at least equal
//to w = 32, h = 32 and d = 32.

  //let worldSize =  new Array(999999999);
  let world;
  let sideX=-20;
  let sideY= -20;
  let sideZ= 200;
  let eyeX= 100;
  let eyeY =100;
  let eyeZ = 100;
  let cam;
let forward= -400;


function setup() {
  createCanvas(500,500,WEBGL);
  frameRate(60);
  //pixelDensity(1);
  fill(0);

  //noiseSeed(99);
  cam = createCamera();
  cam.move(-300,-300,-130);
  cam.camera(sideX,sideY,sideZ,eyeX,eyeY,eyeZ,-300,-300,0);
  //cam.lookAt(200,200,-200);
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
  cam.camera(sideX,sideY,sideZ,eyeX,eyeY,eyeZ,-300,-300,0);

  let dx = -(pmouseX - mouseX)/1.0;
  let dy = -(pmouseY - mouseY)/1.0;
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


}

function keyPressed() {
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  //D key moves to right side
   if (key =='d'){
   sideY= sideY +5;
   sideX= sideX -5;
   eyeY = eyeY +5;
    eyeX= eyeX -5;
   console.log("d key:");
    }
    //A key moves to left side
     if (key =='a'){
  sideY= sideY -5;
   eyeY = eyeY -5;
   sideX= sideX +5;
   eyeX= eyeX +5;
   console.log("a key:");
    }
    //W key moves forward
     if (key =='w'){
   sideX= sideX +5;
      sideY= sideY +5;
   eyeX = eyeX +5;
   eyeY = eyeY +5; 
   console.log("w key:");
    }
    //S key moves backward
    if (key =='s'){
   sideX= sideX -5;
      sideY= sideY -5;
   eyeX = eyeX -5;
   eyeY = eyeY -5;
   console.log("s key:");
    }
  }

