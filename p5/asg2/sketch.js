//sketch
//a world generator and generate a world of size at least equal
//to w = 32, h = 32 and d = 32.


  let world;
  let sideX=-50;
  let sideY= -50;
  let sideZ= 600;
  let eyeX= 120;
  let eyeY =120;
  let eyeZ = 120;
  let cam;
let forward= -400;


function setup() {
  createCanvas(500,500,WEBGL);
  frameRate(60);
  pixelDensity(1);
  fill(0);

//create a camera object
  cam = createCamera();
  cam.move(-300,-300,-130);
  cam.camera(sideX,sideY,sideZ,eyeX,eyeY,eyeZ,-300,-300,0);
 
 //generate new world
  world = new WorldGenerator(this.seed, 32, 32, 32); 

}


function draw() {
  //draw the world each time after it is generated to update camera
  clear();
  world.run();

  //camera updates based on interaction
  cam.camera(sideX,sideY,sideZ,eyeX,eyeY,eyeZ,-300,-300,0);
}

//Drag mouse to rotate camera view
function mouseDragged(event){
   let dx = -( mouseX -pmouseX)/500 ;
   let dy = -(pmouseY - mouseY)/500;
    cam.pan(dx);
    cam.tilt(dy);
  //console.log( "Dx:" +dx)
  //console.log( "Dy:" +dy)

}

//WASD keys allow for FP movement
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

