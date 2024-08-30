let squares = [];
let newGrid = [];

let sz = 60;
let szIncrement = 1;  // Ensure this is non-zero to see the animation
let growing = true;
let t = 0;

let lastUpdateTime;
let updateInterval = 10000;

let display;

let slider;

function setup() {
  createCanvas(1600, 1090, P2D);
  smooth(2);  // Enable anti-aliasing for smoother images
  frameRate(60);

  
  slider = createSlider(0, 255);
  slider.position(1900, 100);
  slider.size(200);

  // Initialize DisplayGrid
  display = new DisplayGrid();

  // Populate the initial squares grid
  populateGrid();
  lastUpdateTime = millis();  // Initialize the last update time
}

function draw() {
  background(255, 0, 100);

  let currentTime = millis();

  if (currentTime - lastUpdateTime >= updateInterval) {
    lastUpdateTime = currentTime;

    if (growing) {
      sz += szIncrement;
      if (sz >= 100) {  // Max size before shrinking
        growing = false;
      }
    } else {
      sz -= szIncrement;
      if (sz <= 100) {  // Min size before growing
        growing = true;
      }
    }

    populateGrid();
  }

  display.grid();
}

function populateGrid() {
  squares = [];
  newGrid = [];

  for (let x = 0; x < width; x += sz) {
    for (let y = 0; y < height; y += sz) {
      squares.push(new GridSquare(x, y, sz, sz));
    }
  }

  for (let i = 0; i < squares.length; i++) {
    let sqr = squares[i];
    sqr.subDiv(sqr);
  }
}
