//retrieve node in DOM via ID
var c = document.getElementById("slate");

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//init global state var
var mode = "rect";


//alt version of header:
//var toggleMode = (e) => {
var toggleMode = function(e) {
    console.log("toggling...");
    if (mode == "rect") {
	mode = "circ";
	buttonToggle.innerHTML = "Circle";
    }
    else {
	mode = "rect";
	buttonToggle.innerHTML = "Rectangle";
    }
}


var drawRect = function(e) {
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    console.log("mouseclick registered at ", mouseX, mouseY);

    ctx.fillStyle="#ff0000";
    ctx.fillRect(mouseX, mouseY, 100, 200);
}


//var drawCircle = function(e) {
var drawCircle = (e) => {
    var mouseX = event.offsetX;
    var mouseY = event.offsetY;
    console.log("mouseclick registered at ", mouseX, mouseY);

    ctx.beginPath();
    ctx.fillStyle="#ff0000";
    ctx.arc(mouseX, mouseY, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}


//var draw = function(e) {
var draw = (e) => {
    console.log("draw")
    if (mode == "rect") {
	drawRect();
    }
    else {
	drawCircle();
    }
}


//var wipeCanvas = function() {
var wipeCanvas = () => {
    console.log("wiping canvas...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
    console.log("ET VIOLA.  eh?")
}


c.addEventListener("click", draw);

var bToggler = document.getElementById("buttonToggle");
bToggler.addEventListener("click", toggleMode );

var clearB = document.getElementById("buttonClear");
clearB.addEventListener("click", wipeCanvas );

// -------------------------------------------------------------------

var c = document.getElementbyId("car");
var ctx = c.getContext("2d");
var requestID;

function newCar(){

};













