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
        this.y = height/2;
        this.s = 10;
        this.angle = radians(90);
        this.rules = rules;
       // this.probability = random(0,1); ///include probability in constructor
        this.stack = [];
        this.colorR = random(0,255);
        this.colorG = random(0,255);
        this.colorB = random(0,255);

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
                    ns += random(this.rules[s[j]]);
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
                case "A":
                    stroke(random(0,255));
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                     fill(this.colorB +100,this.colorR +70,this.colorG +60);
                     ellipse(this.x+10,this.y,random(0,30));
                    vertex(this.x, this.y);
                    break;
                case "B":
                    endShape();
                    beginShape();
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    noise(vertex(this.x, this.y));

                    break;
                case "C":
                    endShape();
                    beginShape();
                    fill(this.colorR,this.colorG,this.colorB);
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x - cos(this.angle), this.y +sin(this.angle));
                   // noStroke();
                    ellipse(this.x,this.y,random(0,10));
                    break;
                case "T":
                    fill(this.colorR +100,this.colorG +70,this.colorB +60);
                    this.x += cos(this.angle) * this.s;
                    this.y -= sin(this.angle) * this.s;
                    vertex(this.x, this.y);
                    rect(this.x +50,this.y +50,random(0,20),random(0,20));
                    break;

                case "S":
                    fill(this.colorB -100,this.colorB +70,this.colorB -100);
                    this.x -= cos(this.angle) * this.s;
                    this.y += sin(this.angle) * this.s;
                    stroke(0);
                    vertex(this.x, this.y);
                    rect(this.x +100,this.y -100 ,random(0,15),random(0,10));
                     fill(this.colorR +100,this.colorR -70,this.colorR -100);
                     ellipse(this.x -100,height/2 + 10 ,random(0,40));
                    break;
                default:
                    console.log("Command doesn't exist");
            }
        }

        endShape();
    }
}
