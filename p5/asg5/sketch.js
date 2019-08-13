
let isClicked = false;
let button;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    button = createButton('Play');
    button.position(width - 80, 20);
    button.mousePressed(onButtonClicked);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
}

function draw() {
    midiPlayer.draw();
}

function onButtonClicked() {
    isClicked = !isClicked;

    if(isClicked) {
        // console.log("start");
        button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
        button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function onMIDIsLoaded(pianoRolls) {
    //get data for Markhov model
    let modelData = midiPlayer.pianoRolls.map(midiPlayer.pianoRoll2Text);
    //create Markhov model and feed it modelData
    let markhov = new Markhov(modelData);
    //use Markhov to create string
    //let rollText = "62_4 . . . . . 61_4 64_4 . . . . . 60_4 66_4 . . . . . 59_4 67_4";
    let rollText = markhov.create();
   // console.log(rollText);
    //convert string to midi
    let midiData = midiPlayer.text2Midi(rollText);console.log(midiData);
    //convert midi to pianoRoll
    let pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration , midiData.tracks[0].notes);
    //play pianoRoll
    midiPlayer.setPianoRoll(pianoRoll, tsCallback);

    // Encode the piano roll (2D array) as string
    let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
    //console.log(midiText);
}


function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}
