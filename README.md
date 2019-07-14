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



