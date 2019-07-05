//particle.js
//Evita Lobo
/*
a "Particle" class with the necessary properties and methods to instantiate a particle at a given position and to emit a created particle given a force and lifetime as parameters. 
When created, a particle should be set to "dead" and when emitted it should be set to "alive". 
When "alive", a particle should be moving according to the given force and should "die" (disappear) after it's lifetime is passed. 
Dead particles always go back to the position it was originally created.
Adapted from Nature of Code example from chapter 4 - moving particle system
*/

let theyExpand = 1;

class Particle {

  constructor(x, y) {
    this.force = createVector(0, 0.25);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = createVector(x, y);
    this.lifespan = 255.0;
    this.scale =random(0,4);
    this.color = [random(0, 255), random(0,255), random(0,255)];
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update(someLevel) {
    this.velocity.add(this.force);
    console.log(someLevel);
    this.position.y += this.velocity.y / (someLevel*2);
    if (this.position.y > height) {
    this.position.y = 0;
  	}

  	this.diameter = map(someLevel, 0, 10, 0, 100) * this.scale * theyExpand;
    this.lifespan -= 2.0;
  }

  // Method to display
  display() {
    stroke(0, this.lifespan);
    strokeWeight(.5);
    fill(this.color, this.lifespan);
    //console.log(this.position.x, this.position.y, this.diameter, this.diameter);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }

  // Checks if particle is dead based on lifespan
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

  
}
