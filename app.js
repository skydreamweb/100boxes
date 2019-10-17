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

// Timer function
let timer = function () {
    document.getElementById("time").innerHTML = counterTime;
}

// Score function
let score = function () {
    document.getElementById("result").innerHTML = counterClick;
}

// Create grid 10*10
for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {

        let rowOptions = {
            width: 60,
            height: 60,
            top: 60 * i,
            left: 60 * j,
            rx: 5,
            ry: 5,
            hasControls: false,
            stroke: '#eee',
            fill: '#fbfcf2',
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: 'pointer',
            x: j + 1,
            y: i + 1,
            idCColor: 'blank',
            idRColor: 'blank',
            color: 'white'
        };

        // Rectangle class
        let row = new fabric.Rect(rowOptions);

        // Adds objects to collection, Canvas or Group, then renders canvas 
        canvas.add(row);
    }
}
// Array of possible combinations to add to / substract from clicked field[x, y]
const coordinate = [
    [-3, 0],
    [3, 0],
    [0, -3],
    [0, 3],
    [2, 2],
    [-2, -2],
    [2, -2],
    [-2, 2]
];

// Game start function - Change game status - Time / Score counter
let gameStart = function () {
    gameStage = 'in-game';
    int1 = setInterval(() => {
        counterTime += 1;
        timer();
        score();
    }, 1000);
}