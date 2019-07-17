//parser.js
/*a GenerativeGrammar class with the necessary properties and methods to
 expand a given axiom with a given set of symbols and production rules 
 for a given amount of generations.
This grammar has to be nondeterministic. In other words, it has to support 
multiple production rules  for the same nonterminal symbol. 
The production rules and their probabilities should be given as
 an argument to the constructor of the GenerativeGrammar class.

*/


class GenerativeGrammar {
    constructor(rules) {
        this.x = width/2;
        this.y = height - 200;
        this.s = 10;
        this.angle = radians(90);
        this.rules = rules;
       // this.probability = random(0,1); ///include probability in constructor
        this.stack = [];
    }

    expand(axiom, n) {
        let s = axiom;

        // Generations
        for(let i = 0; i < n; i++) {
          //  console.log("Generation " + i)

            let ns = "";
            // Iterate on every character of s expanding nonterminals
            for(let j = 0; j < s.length; j++) {
                // If the characte has a rule in the rules, it is
                // a nonterminal.
                if(s[j] in this.rules) {
                    ns += this.rules[s[j]];
                }
                else {
                    ns += s[j];
                }
            }

          //  console.log(ns);
            s = ns;
        }

        return s;
    }

    drawString(s, theta) {
        noFill();
        stroke(0);
        beginShape();

        vertex(this.x, this.y);

        for(let i = 0; i < s.length; i++) {
            switch (s[i]) {
                case "+":
                    this.angle += radians(theta);
                    break;
                case "-":
                    this.angle -= radians(theta);
                    break;
                case "[":
                    this.stack.push([this.x, this.y]);
                    break;
                case "]":
                    endShape();
                    beginShape();
                    let ppos = this.stack.pop();
                    this.x = ppos[0];
                    this.y = ppos[1];
                    vertex(this.x, this.y);
                    break;
                case "F":
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                case "G":
                    endShape();
                    beginShape();
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    break;
                case "A":

                case "B":

                default:
                    console.log("Command doesn't exist");
            }
        }

        endShape();
    }
}