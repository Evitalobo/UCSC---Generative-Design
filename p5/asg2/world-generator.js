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

		this.seed = seed;//make it so that you can take a string and create a new world
   		seed = str(seed);
   		//textures
		this.deep = loadImage('textures/deep.png');
		this.shallow = loadImage('textures/shallow.png');
		this.sand = loadImage('textures/sand.png');
		this.grass = loadImage('textures/grass.png');
		this.stone = loadImage('textures/stone.png');
		this.mountain = loadImage('textures/mountain.png');
		this.ice = loadImage('textures/ice.png');

   		//save(seed);
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.world3d = [];
        let threshold = .5;
        //threshold play with
      
        //random height based on width and depth
        for(let y = 0; y <height; y++){ 
        	this.world3d[y] = [];
    		for( let x = 0; x <width; x++){
    			this.world3d[y][x] = [];
				for(let z = 0; z <depth; z++){ 
					this.world3d[y][x][z] = false;
					//use noise to define height
					let noiseFunc = noise(x/10 ,y/10, z/10);
					//height = noiseFunc;
					if(noiseFunc < threshold) {
						
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

					for(let z=0;z<this.depth;z++) {
						//set z depth value
			 			if(z >= 0 && z < 3) {
			 				if(this.world3d[y][x][z]) {
	     					box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
	     					texture(this.deep);
	     				}
							
						}
						else if (this.depth >= 3 && this.depth < 6){
							if(this.world3d[y][x][z]) {
	     					box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
	     					texture(this.shallow);
	     				}
				       		
				      }
				       else if (this.depth >= 6 && this.depth < 12){
				       	if(this.world3d[y][x][z]) {
	     					box(y*this.brickSize, x*this.brickSize, z*this.brickSize);
	     					texture(this.sand);
	     				}
				       		


				      }
				       else if (this.depth >= 12 && this.depth < 17){
				        	texture(this.grass);
				      }
				       else if (this.depth >= 17 && this.depth < 23){
				       		texture(this.stone);
				      }
				       else if (this.depth >= 23 && this.depth < 28){
				       		texture(this.mountain);
				      }
				       else {
				       		texture(this.ice);
				      }
		     			
     			}
     		}
     	}
  }
}