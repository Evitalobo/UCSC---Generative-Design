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
		//brick width,height and depth
		this.brickSize = 16;
	
		//edit number to change seed value
		noiseSeed(42);
   		


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
       
      
        // store world height,width and depth in world3d array
        for(let y = 0; y <height; y++){ 
        	this.world3d[y] = [];
    		for( let x = 0; x <width; x++){

				//use noise to define depth from top (noise takes in height and width parameters)
    			let noiseFunc = noise(x/10,y/10) *depth ;
				//console.log(noiseFunc)
    			this.world3d[y][x] = [];
				for(let z = 0; z <depth; z++){ 
					this.world3d[y][x][z] = false;
					
					//noise(x,yy) + (32 *6)
					
					//Checks to see if the noise value is more than intial depth(0), if so then stores potential values
					if(noiseFunc > z) {
						this.world3d[y][x][z] = true; 
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

    		strokeWeight(.5);
	     	for(let y=0;y<this.height;y++) {
	     		for(let x=0;x<this.width;x++) {
					//set z depth value to see how far away from top of world
					for(let z=0;z<this.depth;z++) {
						//if there is nothing, render no cubes
						if(!this.world3d[y][x][z]){
							continue;
						}
						
						//based on the z position for each cube in the this.world3d[y][x] array, chose a texture
			 			if(z >= 0 && z < 8) {
			 			texture(this.deep);
					  }else if (z >= 8 && z < 12){
	     					//box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
	     					texture(this.shallow);
				      }else if (z >= 12 && z < 15){
	     					texture(this.sand);
				      }else if (z >= 15 && z < 18){
				       //box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
				        	texture(this.grass);
				      }else if (z >= 18 && z < 21){
				       		texture(this.mountain);
				      }else if (z >= 21 && z < 23){
				       		texture(this.stone);
				      } else {
				       		texture(this.ice);
				      }
				      //push and pop the stack of cubes and move it based on the position based on the world array
				      	push();
				      	translate(y*this.brickSize, x*this.brickSize, z*this.brickSize);
		     			box(this.brickSize,this.brickSize,this.brickSize);
		     			pop();
     			}
     		}
     	}
  }
}