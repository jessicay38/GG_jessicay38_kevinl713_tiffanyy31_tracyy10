//Gets the game element/box
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let LaneSize = Math.floor(canvas.height/12);
let carW = Math.floor(canvas.width / 15);
let minSpawn = 500;
let maxSpawn = 1000;
let score = 0;
let playing = true;
let animationId;
let Chicken;
function Lane(ycor){
  this.type = Math.random()*3;
  this.direction = Math.random();
  this.y = ycor;
  this.cars = [];
  if(this.type > 2){
    this.carInterval = null;
  }
  else{
    this.carInterval = setInterval(() => makeCar(this.cars,new car(this)),(Math.random() * (maxSpawn - minSpawn) + minSpawn));
  }
}
function car(lane){
  if(lane.direction > 0.5){
    this.x = canvas.width + Math.random()*100;
    this.speed = -10;
  }
  else{
    this.x = - Math.random()*100;
    this.speed = 10;
  }
  this.y = lane.y;
}
function main(){
  var lanes = [];
  setup(lanes);
}
function setup(arr){
  var start = document.createElement("BUTTON");
  var rect = canvas.getBoundingClientRect();
  start.style.position = "absolute";
  start.style.left = rect.left+rect.width/2+"px";
  start.style.top = rect.top + rect.height/2 + "px";
  start.style.width = canvas.width/4+"px";
  start.style.height = canvas.height/4+"px";
  start.textContent = "START";
  start.style.border = "4px";
  start.onclick = function(){document.body.removeChild(start);initialize(arr);};
  document.body.append(start);
}
function makeCar(arr, car){
  arr.push(car);
}
function initialize(arr){
  Chicken = new chicken();
  for(var i = 0; i < Math.ceil(canvas.height/LaneSize);i ++){
    arr.push(new Lane(canvas.height-LaneSize*(i+1)));
  }
  document.addEventListener("keydown", function(event) {
    if(playing){
      if(event.key === "w" || event.key === "ArrowUp") {
        Chicken.y -= LaneSize;
        score ++;
      }
      if(event.key === "a" || event.key === "ArrowLeft") {
        Chicken.x -= LaneSize;
      }
      if(event.key === "d" || event.key === "ArrowRight") {
        Chicken.x += LaneSize;
      }
      }
    });
  animate(arr);
}
function drawBackground(arr){
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
//Increments the lane y-cor and updates the actual element on html
function backgroundMove(arr){
  for(var i = 0; i < arr.length; i ++){
    arr[i].y ++;
    modCars(arr[i].cars);
  }
  Chicken.y ++;
}
function modCars(arr){
  if (arr.length === 0 || !playing) return;
  if(arr[0].speed < 0){
    var bound = 0;
    for (var i = arr.length - 1; i >= 0; i--){
      if(arr[i].x+carW < bound){
        arr.splice(i,1);
      }
      else{
        arr[i].x += arr[i].speed;
        arr[i].y += 1;
      }
    }
  }
  else{
    var bound = canvas.right;
    for (var i = arr.length - 1; i >= 0; i--){
      if(arr[i].x > bound){
        arr.splice(i,1);
      }
      else{
        arr[i].x += arr[i].speed;
        arr[i].y += 1;
      }
    }
  }
}
//Adds and removes lanes
function modLanes(arr){
  if(arr[arr.length-1].y >= 0){
    arr.push(new Lane(arr[arr.length-1].y-LaneSize));
  }
  if(arr[0].y>= canvas.height){
    clearInterval(arr[0].carInterval);
    arr[0].cars = [];
    arr.shift();
  }
}
//Basically a loop that animates the screen
function animate(arr){
  if (!playing) {
    cancelAnimationFrame(animationId);
    for(var i = 0; i < arr.length; i ++){
      clearInterval(arr[i].carInterval);
    }
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundMove(arr);
  modLanes(arr);
  drawAll(arr);
  for(var i = 0; i < arr.length; i ++){
    if(arr[i].y == Chicken.y){
      collision(arr[i].cars,arr[i].type);
    }
  }
  animationId = requestAnimationFrame(function() { animate(arr); });
}
function chicken(){
  this.x = canvas.width/2 - LaneSize/4;
  this.y = canvas.height - LaneSize;
}
function drawChicken() {
  ctx.fillStyle = "white";
  ctx.fillRect(Chicken.x, Chicken.y, LaneSize / 2, LaneSize / 2);
}
function drawCars(arr) {
  ctx.fillStyle = "purple";
  for (let lane of arr) {
    for (let car of lane.cars) {
      ctx.fillRect(car.x, car.y, carW, LaneSize);
    }
  }
}
function collision(arr,type){
  for(var i = 0; i < arr.length; i ++){
    if((Chicken.x > arr[i].x && Chicken.x < arr[i].x + carW) || (Chicken.x + LaneSize/2 > arr[i].x && Chicken.x + LaneSize/2 < arr[i].x + carW)){
      playing = false;
      return;
    }
  }
}
function drawAll(arr){
  drawBackground(arr);
  drawCars(arr);
  drawChicken();
}
main()
