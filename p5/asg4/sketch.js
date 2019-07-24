let world;
let race;
let camera;
let GA;

function preload() {
  textGen = loadFont('ArcadeClassic.ttf');
}

function setup() {
  createCanvas(640, 400, WEBGL);
  setAttributes('antialias', true);
  textFont(textGen);

  // Initialize box2d physics and create the world
  world = createWorld();
  camera = createCamera();

  // Create Camera
  camera.ortho(-width / 2, width / 2, -height / 2, height /2, 0, 10);
  camera.setPosition(0, 0, 0);

  // Create a list of cars
  let cars = []
  for(let i = 0; i < 10; i++) {
      let feats = Car.randomFeatures();
      let pos = createVector(0, -100);
      let car = new Car(pos.x, pos.y, "car" + i, feats);
      cars.push(car);
  }

  // Create a terrain
  let pos = createVector(-width/2, 10);
  terrain = new Terrain(pos.x, pos.y, 100, 100, 1);

  // Create a world to manage the cars
  race = new Race(terrain, cars, raceOverCallback);
  race.start();
}

function draw() {
    if (race.running) {
        background(240);
    }

    race.update();
    race.draw();

    if(race.running) {
        // Update physics. 2nd and 3rd arguments are velocity and position iterations
        let timeStep = 1.0 / 30;
        world.Step(timeStep, 10, 10);

        // Get race leaderboards
        let leaderboard = race.getLeaderboards();

        // Follow first car with the camera
        let firstCar = leaderboard[0].car;
        text(leaderboard[0].car,100,100);

        if (firstCar) {
            let firstPos = firstCar.getPosition();
            camera.setPosition(firstPos.x + width/5, firstPos.y, camera.eyeZ);
        }
    }
}

// ========================================
// Callback function for when the race is over
// ========================================
function raceOverCallback(finalLeaderboards) {
    console.log("race over!");
    console.log(finalLeaderboards);

    //GA instantiation of Genetic Algorithms class
    let popSize = 10;
    let indSize = 20;
    let fitFunc = function(gens){
     // console.log(finalLeaderboards);
     let cars = finalLeaderboards.filter(function(c){
        return JSON.stringify(c.car.feats) === JSON.stringify(gens);
     });
     return cars[0] ? cars[0].progress : 0;
    }

    let mutationRate = 0.1;
    let mutationFunc = Car.randomFeatures;

    GA = new GeneticAlgorithm(popSize, indSize, fitFunc, mutationRate, mutationFunc);

    for (let i=0 ; i < GA.population.length ; i++){
      let ind = GA.population[i];
      ind.gens = finalLeaderboards[i].car.feats;
    }
    //evolve and best is not going to work since it happens at ga.js line 49
    let best = GA.evolve();

    // Restart race with new cars
    let cars = []
    for(let i = 0; i < 10; i++) {
        let feats = GA.population[i].gens;
        let pos = createVector(0, -100);
        let car = new Car(pos.x, pos.y, "car" + i, feats);
        cars.push(car);
    }

    console.log(cars)
    race.setCars(cars);
    race.start();




}
