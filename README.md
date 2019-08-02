# UCSC - Generative-Design -CMPM 147 Portfolio
#          Evita Lobo  

# Final Project Proposal

Artist statement:
  I enjoy playing RPG games but they can get boring after a while if there is not that much randomization. I would like to make a game that uses a different set of generative grammars in combination with having the environment be reactive to audio. In a previous assignment, I simulated ellipses falling down when sound was made to simulate rain. I would like to expand that concept and see how I can interact with an RPG map on screen and change the maps to represent the music being played. I spent lots of time as a kid spending hours playing RPG games and having an entire game soundtrack drilled in my head but the scenery always stayed the same.
  
Player Experience:
  The player will see a map and an NPC character on the other side of the screen. They will need to change the music, which in turn will change the map. Initially, the player cannot walk to the NPC because there are barriers, so as a result- they must change the music/map in order to gain access to the NPC as a part of their quest. I want to have music that isn’t typically RPG oriented but more instrumental centered. For each noise, I will map out different regions of the map to be colored based on that audio. I will also paint the tiles by using watercolor. A similar style is portrayed in a past game I made, Crystal Caves- https://evitalobo.itch.io/ 
The user can press a specific key or get to a certain part of a map in order to change the map. Thus appearing more like a simple puzzle game. 

Technical details:
  I am using a combination of audio visualization and generative grammars. I am using audio visualization to build a new map each time based on the music. I am using generative grammars to design a new artwork each time the player can reach the NPC. The combination of the maps and audio visualization will result in a randomized puzzle game to get to the NPC each time. I will use a similar method of 2D terrain generation but also link it with an audio component to give randomized values each time.

Schedule:
Friday 08/02 
	-Create a map that can take in one audio input and refreshes the map based on the snippet of the sound
Wednesday 08/07 
	-Create a system that can switch multiple audio inputs and generate a new map based on that
Friday 08/09 
	-Playtest everything so that there is a game component that creates puzzles for the player based on the map and also elaborate on the generative grammar where the player can pick between two different forms of art
Wednesday 08/14 
	-Make sure every component of the game is working and refined based on playtesting








# ASSIGNMENTS




# ASG1 - Music Visualization with particle systems
Circles fall to the bottom of the screen as thunder crackles and rain hits the floor. Watch the size of the "droplets" get bigger as the music gets louder. I used the FFT(Fast Fourier Transform) to visualize how audio such as a thunder sound can be used to effect particle systems implemented using P5(Construct). Once a particle gets to the bottom of the screen it "dies" and respawns at the top.

![Water particles](https://github.com/Evitalobo/IMG/blob/master/img/Screen%20Shot%202019-07-06%20at%205.55.52%20PM.png?raw=true)
![Water particles over time](https://github.com/Evitalobo/IMG/blob/master/img/Screen%20Shot%202019-07-06%20at%205.55.39%20PM.png?raw=true)




# ASG2 - Terrain Generation with Perlin Noise
Noise produces a naturally ordered sequence of pseudo-random numbers. It can be used to generate various effects with organic like properties. It can also be used for world generation. By using the width and the height to generate noise, I was able to map it to the depth value and create a random world based on a seed input- similar to the algorithm minecraft uses. The world generator constructor takes in a seed,width,height and depth value. Based on the depth of each cube, it is mapped to a specific texture. You can use the WASD keys to move throughout the world and drag the mouse to rotate the angle of the camera.

Aerial view:
![Aerial view](https://github.com/Evitalobo/IMG/blob/master/img/ASG2PIC.png?raw=true) 

Side view:
![Side view](https://github.com/Evitalobo/IMG/blob/master/img/ASG2PIC1.png?raw=true)





# ASG3 - Interactive Artist NPC with Generative Grammars
Generative Grammars can be used to generate a variety of structured sequences of symbols that are part of a vocabulary. The meaning of these symbols depends on the generative context (e.g. characters, words, colors, musical notes, video game levels, movement instructions, etc). I used non-deterministic grammar to create small little abstract visual art.  The player(circle) will use the WASD keys to move towards the NPC. Once the player is close enough, the NPC will turn yellow and you can press spacebar to interact with it. You can press the "y" key to generate a new abstract art piece and press "n" to close the dialogue box. I used two different axioms to achieve my result. Specific rules included: changing colors, changing stroke color, placing ellipses, placing rectangles and also changing the direction they went. Below are some pictures that I used while progressing through this assignment. 

Original axiom(no longer in use):
![pic1](https://github.com/Evitalobo/IMG/blob/master/img/ASG3-2.png?raw=true)

Combination of two axioms (with 3rd generation max):
![pic2](https://github.com/Evitalobo/IMG/blob/master/img/ASG3-3.png?raw=true)

Combination of two axioms (with 3rd generation max):
![pic3](https://github.com/Evitalobo/IMG/blob/master/img/ASG3-4.png?raw=true)







# ASG4 - Evolving Cars
Genetic Algorithms (GA) are a stochastic search method inspired by biological evolution  that can be applied to generate complex content with feasibility constraints. I used a Genetic Algorithm to evolve cars to traverse a bumpy terrain- Much similar to BoxCar2D. The genetic algorithm takes the best car at the end of the race and uses it as a parent to create offsprings. The offsprings has two parents and using the rouletteWheel() function, it will pick a value from either parent. Then it will mutate one or few of values stored in the cars features. Without mutation- it would be impossible to have a different input from the parent. Hence the child of the parent will then be generated based on the fitness function. You can see in the pictures below that the current generation resembles the past generation with just minor mutations.

17th Generation of cars:
![pic1](https://github.com/Evitalobo/IMG/blob/master/img/ASG4-1.png?raw=true)

18th Generation of cars:
![pic2](https://github.com/Evitalobo/IMG/blob/master/img/ASG4-2.png?raw=true)

19th Generation of cars:
![pic3](https://github.com/Evitalobo/IMG/blob/master/img/ASG4-3.png?raw=true)


# ASG 5 - Music with Markov Models

A Markov Chain is a statistical model of a system that changes stochastically from one state to another. It can be applied to generate random sequences  that follow a probability distribution learned from a dataset. In this assignment, you will use a Markov Chain to generate polyphonic music. For this assignment, I downloaded a large collection of classical music. I then created a system that would get data for the markov model from the collection,convert the string info into midi, then convert the midi to piano roll(method to play music on synth) and then play the music based on the piano roll. For the markov model, I would add the data for all of the songs and then randomize the distribution of songs so that it would give back another song chord based on the said duration of the song. By constantly changing the song state, it would give a piece that is created from a variety of different classical music chords.



