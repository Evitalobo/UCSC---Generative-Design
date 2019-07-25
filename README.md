# UCSC - Generative-Design -CMPM 147
#          Evita Lobo  


# ASG1 - Music Visualization with particle systems
Circles fall to the bottom of the screen as thunder crackles and rain hits the floor. Watch the size of the "droplets" get bigger as the music gets louder. I used the FFT(Fast Fourier Transform) to visualize how audio such as a thunder sound can be used to effect particle systems implemented using P5(Construct). Once a particle gets to the bottom of the screen it "dies" and respawns at the top.

![Water particles](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/Screen%20Shot%202019-07-06%20at%205.55.39%20PM.png?raw=true)
![Water particles over time](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/Screen%20Shot%202019-07-06%20at%205.55.52%20PM.png?raw=true)


# ASG2 - Terrain Generation with Perlin Noise
Noise produces a naturally ordered sequence of pseudo-random numbers. It can be used to generate various effects with organic like properties. It can also be used for world generation. By using the width and the height to generate noise, I was able to map it to the depth value and create a random world based on a seed input- similar to the algorithm minecraft uses. The world generator constructor takes in a seed,width,height and depth value. Based on the depth of each cube, it is mapped to a specific texture. You can use the WASD keys to move throughout the world and drag the mouse to rotate the angle of the camera.

Aerial view:
![Aerial view](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG2PIC.png?raw=true) 

Side view:
![Side view](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG2PIC1.png?raw=true)




# ASG3 - Interactive Artist NPC with Generative Grammars
Generative Grammars can be used to generate a variety of structured sequences of symbols that are part of a vocabulary. The meaning of these symbols depends on the generative context (e.g. characters, words, colors, musical notes, video game levels, movement instructions, etc). I used non-deterministic grammar to create small little abstract visual art.  The player(circle) will use the WASD keys to move towards the NPC. Once the player is close enough, the NPC will turn yellow and you can press spacebar to interact with it. You can press the "y" key to generate a new abstract art piece and press "n" to close the dialogue box. I used two different axioms to achieve my result. Specific rules included: changing colors, changing stroke color, placing ellipses, placing rectangles and also changing the direction they went. Below are some pictures that I used while progressing through this assignment. 

Original axiom(no longer in use):
![pic1](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG3-2.png?raw=true)

Combination of two axioms (with 3rd generation max):
![pic2](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG3-3.png?raw=true)

Combination of two axioms (with 3rd generation max):
![pic3](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG3-4.png?raw=true)




# ASG4 - Evolving Cars
Genetic Algorithms (GA) are a stochastic search method inspired by biological evolution  that can be applied to generate complex content with feasibility constraints. I used a Genetic Algorithm to evolve cars to traverse a bumpy terrain- Much similar to BoxCar2D. The genetic algorithm takes the best car at the end of the race and uses it as a parent to create offsprings. The offsprings has two parents and using the rouletteWheel() function, it will pick a value from either parent. Then it will mutate one or few of values stored in the cars features. Without mutation- it would be impossible to have a different input from the parent. Hence the child of the parent will then be generated based on the fitness function. 

7th Generation of cars:
![pic1](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG4-1.png?raw=true)

4th Generation of cars:
![pic2](https://github.com/Evitalobo/UCSC---Generative-Design/blob/master/img/ASG4-2.png?raw=true)

