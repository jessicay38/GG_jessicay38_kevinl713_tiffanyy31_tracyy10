// Get the chicken image element
let chicken_img = document.getElementById("chicken");

// Initialize chicken's position
let chickenX = window.innerWidth / 2 - 25; // Center the chicken
let chickenY = window.innerHeight - 100; // Place chicken near the bottom

// Set initial position of the chicken image
chicken_img.style.position = "absolute"; // Set the chicken image to absolute positioning
chicken_img.style.left = chickenX + "px";
chicken_img.style.top = chickenY + "px";

// Function to move the chicken
function makeMove(e) {
    if (e === "w") {
        chickenY -= 50; // Move up
        chicken_img.style.top = chickenY + "px";
        console.log("Moved: UP");
    } else if (e === "s") {
        chickenY += 50; // Move down
        chicken_img.style.top = chickenY + "px";
        console.log("Moved: DOWN");
    } else if (e === "a") {
        chickenX -= 50; // Move left
        chicken_img.style.left = chickenX + "px";
        console.log("Moved: LEFT");
    } else if (e === "d") {
        chickenX += 50; // Move right
        chicken_img.style.left = chickenX + "px";
        console.log("Moved: RIGHT");
    } else {
        console.log("Illegal move!");
    }
}

// Listen for keypress events to move the chicken
document.addEventListener("keypress", (event) => {
    makeMove(event.key);
});

// Game Setup: Create lanes and cars (as per original logic)
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let LaneSize = Math.floor(canvas.height / 12);
let carW = Math.floor(canvas.width / 15);
let minSpawn = 500;
let maxSpawn = 1000;
let score = 0;
let playing = true;
let animationId;
let Chicken;

// Lane constructor
function Lane(ycor) {
    this.type = Math.random() * 3;
    this.direction = Math.random();
    this.y = ycor;
    this.cars = [];
    if (this.type > 2) {
        this.carInterval = null;
    } else {
        this.carInterval = setInterval(() => makeCar(this.cars, new car(this)), (Math.random() * (maxSpawn - minSpawn) + minSpawn));
    }
}

// Car constructor
function car(lane) {
    if (lane.direction > 0.5) {
        this.x = canvas.width + Math.random() * 100;
        this.speed = -10;
    } else {
        this.x = -Math.random() * 100;
        this.speed = 10;
    }
    this.y = lane.y;
}

// Initialize game
function main() {
    var lanes = [];
    setup(lanes);
}

// Setup the start button
function setup(arr) {
    var start = document.createElement("BUTTON");
    var rect = canvas.getBoundingClientRect();
    start.style.position = "absolute";
    start.style.left = rect.left + rect.width / 2 + "px";
    start.style.top = rect.top + rect.height / 2 + "px";
    start.style.width = canvas.width / 4 + "px";
    start.style.height = canvas.height / 4 + "px";
    start.textContent = "START";
    start.style.border = "4px";
    start.onclick = function () {
        document.body.removeChild(start);
        initialize(arr);
    };
    document.body.append(start);
}

// Create car in lane
function makeCar(arr, car) {
    arr.push(car);
}

// Initialize lanes and chicken
function initialize(arr) {
    Chicken = new chicken();
    for (var i = 0; i < Math.ceil(canvas.height / LaneSize); i++) {
        arr.push(new Lane(canvas.height - LaneSize * (i + 1)));
    }
    document.addEventListener("keydown", function (event) {
        if (playing) {
            if (event.key === "w" || event.key === "ArrowUp") {
                Chicken.y -= LaneSize;
                score++;
            }
            if (event.key === "a" || event.key === "ArrowLeft") {
                Chicken.x -= LaneSize;
            }
            if (event.key === "d" || event.key === "ArrowRight") {
                Chicken.x += LaneSize;
            }
        }
    });
    animate(arr);
}

// Draw the background
function drawBackground(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].type > 2) {
            ctx.fillStyle = "lightgreen";
        } else if (arr[i].type > 1) {
            ctx.fillStyle = "lightblue";
        } else {
            ctx.fillStyle = "gray";
        }
        ctx.fillRect(0, arr[i].y, canvas.width, LaneSize);
    }
}

// Move the background and lanes
function backgroundMove(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].y++;
        modCars(arr[i].cars);
    }
    Chicken.y++;
}

// Modify cars
function modCars(arr) {
    if (arr.length === 0 || !playing) return;
    if (arr[0].speed < 0) {
        var bound = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].x + carW < bound) {
                arr.splice(i, 1);
            } else {
                arr[i].x += arr[i].speed;
                arr[i].y += 1;
            }
        }
    } else {
        var bound = canvas.right;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].x > bound) {
                arr.splice(i, 1);
            } else {
                arr[i].x += arr[i].speed;
                arr[i].y += 1;
            }
        }
    }
}

// Modify lanes
function modLanes(arr) {
    if (arr[arr.length - 1].y >= 0) {
        arr.push(new Lane(arr[arr.length - 1].y - LaneSize));
    }
    if (arr[0].y >= canvas.height) {
        clearInterval(arr[0].carInterval);
        arr[0].cars = [];
        arr.shift();
    }
}

// Animation loop
function animate(arr) {
    if (!playing) {
        cancelAnimationFrame(animationId);
        for (var i = 0; i < arr.length; i++) {
            clearInterval(arr[i].carInterval);
        }
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundMove(arr);
    modLanes(arr);
    drawAll(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].y == Chicken.y) {
            collision(arr[i].cars, arr[i].type);
        }
    }
    animationId = requestAnimationFrame(function () { animate(arr); });
}

// Chicken constructor
function chicken() {
    this.x = canvas.width / 2 - LaneSize / 4;
    this.y = canvas.height - LaneSize;
}

// Draw chicken on canvas
function drawChicken() {
    ctx.fillStyle = "white";
    ctx.fillRect(Chicken.x, Chicken.y, LaneSize / 2, LaneSize / 2);
}

// Draw all elements (background, cars, chicken)
function drawAll(arr) {
    drawBackground(arr);
    drawCars(arr);
    drawChicken();
}

// Detect collision with cars
function collision(arr, type) {
    for (var i = 0; i < arr.length; i++) {
        if ((Chicken.x > arr[i].x && Chicken.x < arr[i].x + carW) || (Chicken.x + LaneSize / 2 > arr[i].x && Chicken.x + LaneSize / 2 < arr[i].x + carW)) {
            playing = false;
            return;
        }
    }
}

// Draw cars on the canvas
function drawCars(arr) {
    ctx.fillStyle = "purple";
    for (let lane of arr) {
        for (let car of lane.cars) {
            ctx.fillRect(car.x, car.y, carW, LaneSize);
        }
    }
}

main();
