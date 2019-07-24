//is the fitnessfunc supposed to be the entire race?? it is evaluated twice in the evolve()func
//figure out the best car

class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    //the init() population initialization method. Currently, the init() function generates genotypes as random binary arrays. 
    //The Car class has a function randomFeatures() that helps you initializing cars.
    init() {
        for(let i = 0; i < this.indSize; i++) {
            this.gens[i] = int(random(2));

        }
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate, mutationFunc) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;
        this.mutationRate = mutationRate;
        this.mutationFunc = mutationFunc;
        this.init();
    }

    init() {
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
        }
    }

    //reproduction occurs and chose best candiate
    /*
    evolve(N,M,fitnessFunction){
         population = init(M);

        for(i < 0; to n){
            evaluate(population, fitnessFunction);
            matingPool = select(population);
            newOffspring = crossover(matingPool);
            mutate(newOffspring);
            population = newOffspring;
        }
        return best(population);
    }
    */


    evolve() {
        this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);

        this.population = newPopulation;
        //double evaluation
        this.evaluate();
        return this.best();
    }

    evaluate() {
        for(let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunc(individual.gens);
           // console.log(individual)
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }

        return matingPool;
    }

    //the rouletteWheel() function to perform probabilistic selection.
    rouletteWheel() {
        //add all fitness scores
        let sum = this.population.map(function(ind){
                  return ind.fitness;

                 }).reduce(function(a,b){
                    return (a + b);
                 });
        //find percentages of each individual based on the sum- an array of probabilities
        let prob = this.population.map(function(ind){
            return ind.fitness/sum;
        });
       // console.log("probability" + prob);
        //Randomize and pick whichever one is selected
        let rand = Math.random();
        for(let i =0; i < prob.length; i++){
            if(rand < prob[i]){
                return this.population[i];
            }
            rand -= prob[i];
        }
       // console.log("end of rouletteWheel");
    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);

        for(let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));



            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
            
        }
//console.log(newPopulation);
        return newPopulation;
    }

    //the crossover() function  to perform
    crossover(parentA, parentB) {
        let ranA = Math.floor(Math.random() * parentA.gens.length);
        let ranB = Math.floor(Math.random() * parentB.gens.length);
        //ranA will always be <= ran B
        [ranA, ranB] = [Math.min(ranA,ranB),Math.max(ranA,ranB)];

        let genA = parentA.gens.slice(ranA,ranB);
        let genB = parentB.gens.slice(ranA,ranB);

        //crossover to pick either floor of ranA or ranB
        parentA.gens = parentA.gens.slice(0,ranA).concat(genB).concat(parentA.gens.slice(ranB));
        parentB.gens = parentB.gens.slice(0,ranA).concat(genA).concat(parentB.gens.slice(ranB));
        //50% chance of getting either gene
        return Math.random() < 0.5 ? parentA : parentB;
    }

    //the mutate() function to mutate your population of cars.
    mutate(newPopulation) {
        for(let ind of newPopulation){
             let newgens = this.mutationFunc();
             for(let i in ind.gens){
                if(Math.random() < this.mutationRate){
                    ind.gens[i] = newgens[i];
                }
             }
        }
    }

    //  the best() function to return the best car after one generation().
    best() {
       return this.population.sort(function(a, b){    
            return b.fitness - a.fitness ;
        })[0].gens;
    }
}
