//world-generator.js
/* a "WorldGenerator" class with the necessary properties and methods to instantiate a 
voxel-based world with a given seed as well as width, height and depth representing number of unit cubes.
For each cell of the 3D grid, generate a random number noise(x, y, z) where (x, y, z) 
is the coordinate of the cell in the grip.
Map this random number to a type of cube (e.g. deep water, shallow water, sand, grass, cave, mountain, ice, etc). 
Each cube type has to be textured with either one or more textures.
If the same seed is given is input, the same world should be generated.  */


class WorldGenerator{
	constructor(seed, width, height, depth) {
		this.brickSize = 10;
		//bricksize=6 or 16

		noiseSeed(9);//make it so that you can take a string and create a new world
   		//seed = 0;
   		//textures
		this.deep = loadImage('textures/deep.png');
		this.shallow = loadImage('textures/shallow.png');
		this.sand = loadImage('textures/sand.png');
		this.grass = loadImage('textures/grass.png');
		this.stone = loadImage('textures/stone.png');
		this.mountain = loadImage('textures/mountain.png');
		this.ice = loadImage('textures/ice.png');

   		
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.world3d = [];
        let threshold = .7;
        //adjust threshold for intensity
      
        // store world height,width and depth in world3d array
        for(let y = 0; y <height; y++){ 
        	this.world3d[y] = [];
    		for( let x = 0; x <width; x++){


    			let noiseFunc = noise(x/10 ,y/10) *depth;
				//console.log(noiseFunc)
    			this.world3d[y][x] = [];
				for(let z = 0; z <depth; z++){ 
					this.world3d[y][x][z] = false;
					//use noise to define height
					//noise(x,yy) + (32 *6)
					
					//height = noiseFunc;
					if(noiseFunc > z) {
						this.world3d[y][x][z] = true; //box(x,y,z);
						//world3d[y][x][z].setTexture(whatever);
					}
				
		        }
		    }
		}
	}
	run() {
	    //this.update();
	    this.display();
	}

    // Method to display
    display() {
	     	for(let y=0;y<this.height;y++) {
	     		for(let x=0;x<this.width;x++) {

					for(let z=0;z<this.depth/2;z++) {
						/*if(random > 0.01){
							continue;
						}*/
						//console.log(z);
						if(!this.world3d[y][x][z]){
							continue;
						}
						
						//set z depth value to see how far away from top of world
			 			if(z >= 0 && z < 3) {
			 			texture(this.deep);
					  }else if (z >= 3 && z < 6){
	     					//box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
	     					texture(this.shallow);
				      }else if (z >= 6 && z < 12){
	     					texture(this.sand);
				      }else if (z >= 12 && z < 17){
				       //box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
				        	texture(this.grass);
				      }else if (z >= 17 && z < 23){
				       		texture(this.stone);
				      }else if (z >= 23 && z < 28){
				       		texture(this.mountain);
				      } else {
				      		//console.log(z);
				       		texture(this.ice);
				      }
				      	push();
				      	translate(y*this.brickSize, x*this.brickSize, z*this.brickSize);
		     			box(this.brickSize,this.brickSize,this.brickSize);
		     			pop();
     			}
     		}
     	}
  }
}