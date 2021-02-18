const iris = [];
const niris = 200;
const fr = 120;
// noise factors
let noiseScale, noiseStrength;

// noise display factors
const overlayAlpha = 40,
    irisAlpha = 255,
    strokeWidth = .3;

// main circle parameters
let radius;
const minradius = 100, maxradius = 300;

// animation related constiables
let nInsideIris = 0;
let timer = 0;

// colors
const bckg = 0xffffff,
    c1 = 0x000000;
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    smooth(4);
    frameRate(fr);
    initiate();
}

function initiate() {
    timer = 0;
    // radius change for every cycle
    radius = random(windowWidth*0.20, windowWidth*0.40);
    nInsideIris = niris;
    // new noise
    noiseScale = int(random(300, 1500));
    noiseStrength = int(random(25, 100));
    noiseDetail(int(random(1, 10)), 0.5);
    for (let i = 0; i < niris; i++) {
        iris[i] = new Iris();
    }
}

function draw() {

    if (nInsideIris === 0) {
        if (timer === 40) {
            initiate();
        } else {
            // this is for that quick fade at the end of a cycle
            noLoop();
            fill(bckg, 40);
            rect(-5, -5, width + 10, height + 10);
            timer++;
        }
    } else {
        // Animate Iris
        for (let i = 0; i < niris; i++) {
            if (iris[i].isInside) iris[i].drawIris();
        }
    }
}


///////////////////////


function Iris() {
    // x,y    = the current position
    // ox,oy  = the position, but slightly back in time
    // sx,sy  = start positions
    this.isInside = true;
    this.angle = 0;
    this.step = 5;
    this.NDo = int(random(360));
    this.sx = width / 2 + radius * cos(this.NDo);
    this.sy = height / 2 + radius * sin(this.NDo);
    this.ox = this.x = this.sx;
    this.oy = this.y = this.sy;
}

Iris.prototype.drawIris = function () {

    // calculate angle which is based on noise
    // and then use it for x and y positions
    this.angle = noise(this.x / noiseScale, this.y / noiseScale) * noiseStrength;

    // write in the last value of x,y into ox,oy >> old x, old y
    // i need these values to display the line();
    this.ox = this.x;
    this.oy = this.y;

    // calculate new x and y position
    this.x += cos(this.angle) * this.step;
    this.y += sin(this.angle) * this.step;

    // what happens when x and y hit the outside
    this.isInside = (this.x > 0 && this.x < width && this.y > 0 && this.y < height);

    if (this.isInside) {
        // display it
        noFill();
        stroke(c1, irisAlpha);
        strokeWeight(strokeWidth);
        line(this.ox, this.oy, this.x, this.y);
    } else nInsideIris--; //decrease number of Iris inside
};