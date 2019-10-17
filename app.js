// Reference canvas element (with id="c")
const canvas = new fabric.Canvas("c");

// Sets width of this canvas instance
canvas.setWidth(601);

//Sets height of this canvas instance
canvas.setHeight(601);

// Define 'pre-game' status
let gameStage = 'pre-game';

// Define time/click counters
let counterTime = 0;
let counterClick = 0;
let int1 = 0;