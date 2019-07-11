//sketch
//a world generator and generate a world of size at least equal
//to w = 32, h = 32 and d = 32.

  //let worldSize =  new Array(999999999);
  let world;

function setup() {
  createCanvas(500,500,WEBGL);
  frameRate(30);
  pixelDensity(1);
  fill(0);

  world = new WorldGenerator(0, 32, 32, 32); 

}

function draw() {
  clear();
  world.run();

 // camera(0, 40, 40, 0, 0, 0, 0, 4, 0);
 // worldSize[i];.display();

}

