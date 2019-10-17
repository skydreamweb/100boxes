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
const coordinates = [
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

// Game over function - Change game status
let gameOver = function () {
    gameStage = 'game-over';

    // Stop timer - setInterval from gameStart function
    clearInterval(int1);
};

// Setting 2 functions - First Click and any other Regular Click
// First Click function
let firstClick = function (e, clickedField) {
    // First click add to counter
    counterClick += 1;
    // On hover change cursor to pointer
    clickedField.hoverCursor = 'pointer';
    // Fill field green color
    clickedField.set('fill', 'green');
    // Change default "white" value of color property to green
    clickedField.color = 'green';

    // Array of all affected fields around clickedField
    const affectedFields = [];

    // For loop trough coordinates array
    for (let i = 0; i < coordinates.length; i += 1) {
        // X coordinate = clickedField.x coordinate + first value of each array of coordinates array
        const x = clickedField.x + affectedCombos[i][0];
        // Y coordinate = clickedField.y coordinate + second value of each array of coordinates array
        const y = clickedField.y + affectedCombos[i][1];

        // Push object in array with properties x/y and value of coordinates
        affectedFields.push({
            x,
            y
        });
    }
    // For loop trough all of 100 objects
    for (let i = 0; i < e.target.canvas._objects.length; i += 1) {
        // For loop trough affectedFields array
        for (let j = 0; j < affectedFields.length; j++) {
            // If any of 100 object has the same x/y like objects in affectedFields
            if (e.target.canvas._objects[i].x === affectedFields[j].x &&
                e.target.canvas._objects[i].y === affectedFields[j].y) {
                // Fill yellow and change color propety to yellow
                e.target.canvas._objects[i].set('fill', 'yellow');
                e.target.canvas._objects[i].color = 'yellow';
            }
        }
    }
    // Renders both the top canvas and the secondary container canvas.
    canvas.renderAll();
}