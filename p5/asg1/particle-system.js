//particle-system.js
/*
a "Particle System" class with the necessary  
properties and methods to instantiate a list of N particles starting at the same position and to emit particles.
To emit a particle, the particle system first look for an available "dead" one in the list 
of particles and then call the proper function on that particle given a force and a lifetime as parameters.
Adapted from Nature of Code example from chapter 4 - moving particle system
*/


class ParticleSystem {
  //constructor to create Particle System
  constructor(x, y) {
    //set location of particles
    this.origin = createVector(x, y);
    //empty array to hold particles
    this.particles = [];
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      //if valid origin point, then create new particle
      this.particles.push(new Particle(x, y));
    } else {
      //if not valid, then push from begining point
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    // Run each particle at location(x,y)
    for (let particle of this.particles) {
      particle.run();
    }

    // Removes dead particles
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}