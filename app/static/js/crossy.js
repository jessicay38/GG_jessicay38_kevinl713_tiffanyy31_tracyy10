//Gets the game element/box
let game = document.getElementById("game");
//Gets the height of the game
let height = game.offsetHeight;
let LaneSize = Math.floor(height/12);
//Gets the coordinates with top left corner as origin
let pos = game.getBoundingClientRect();
let carW = Math.floor(game.offsetWidth/15);
let rightSpawn = pos.right;
let leftSpawn = pos.left;
let minSpawn = 500;
let maxSpawn = 1000;
let score = 0;
let playing = true;
let animationId;
var chicken;
function Lane(ycor){
  this.type = Math.random()*3;
  this.direction = Math.random();
  this.y = ycor;
  this.el = null;
  this.cars = [];
  this.carInterval = setInterval(() => makeCar(this.cars,new car(this)),(Math.random() * (maxSpawn - minSpawn) + minSpawn));
}
function car(lane){
  if(lane.direction > 0.5){
    this.x = rightSpawn + Math.random()*100;
    this.speed = -10;
  }
  else{
    this.x = leftSpawn - Math.random()*100;
    this.speed = 10;
  }
  this.y = lane.y;
  this.el = null;
}
function main(){
  var lanes = [];
  setup(lanes);
}
function setup(arr){
  var start = document.createElement("BUTTON");
  start.style.position = "absolute";
  start.style.left = pos.left + 3*pos.width/8 + "px";
  start.style.top = pos.bottom-pos.height/2 + "px";
  start.style.width = pos.width/4+"px";
  start.style.height = pos.height/4+"px";
  start.textContent = "START";
  start.style.border = "4px";
  start.onclick = function(){initialize(arr);};
  game.append(start);
}
function makeCar(arr, car){
  var newCar = document.createElement("div");
  newCar.style.position = "absolute";
  newCar.style.left = car.x+"px";
  newCar.style.top = car.y+"px";
  newCar.style.width = carW+"px";
  newCar.style.height = LaneSize+"px";
  newCar.style.backgroundColor = "purple";
  car.el = newCar;
  arr.push(car);
  game.append(newCar);
}
function initialize(arr){
  chicken = new chicken();
  for(var i = 0; i < Math.ceil(height/LaneSize);i ++){
    arr.push(new Lane(pos.bottom-LaneSize*(i+1)));
    addElement(arr,i);
  }
  document.addEventListener("keydown", function(event) {
    if(playing){
      if(event.key === "w" || event.key === "ArrowUp") {
        chicken.y -= LaneSize;
        score ++;
      }
      if(event.key === "a" || event.key === "ArrowLeft") {
        chicken.x -= LaneSize;
      }
      if(event.key === "d" || event.key === "ArrowRight") {
        chicken.x += LaneSize;
      }
      chicken.el.style.top = chicken.y + "px";
      chicken.el.style.left = chicken.x + "px";
      }
    });
  animate(arr);
}
//Increments the lane y-cor and updates the actual element on html
function backgroundMove(arr){
  for(var i = 0; i < arr.length; i ++){
    arr[i].y ++;
    arr[i].el.style.top = arr[i].y + "px";
    modCars(arr[i].cars);
  }
  chicken.y ++;
  chicken.el.style.top = chicken.y + "px";
}
function modCars(arr){
  if (arr.length === 0 || !playing) return;
  if(arr[0].speed < 0){
    var bound = pos.left;
    for (var i = arr.length - 1; i >= 0; i--){
      if(arr[i].x+carW < bound){
        game.removeChild(arr[i].el);
        arr.splice(i,1);
      }
      else{
        arr[i].x += arr[i].speed;
        arr[i].y += 1;
        arr[i].el.style.left = arr[i].x+"px";
        arr[i].el.style.top = arr[i].y+"px";
      }
    }
  }
  else{
    var bound = pos.right;
    for (var i = arr.length - 1; i >= 0; i--){
      if(arr[i].x > bound){
        game.removeChild(arr[i].el);
        arr.splice(i,1);
      }
      else{
        arr[i].x += arr[i].speed;
        arr[i].y += 1;
        arr[i].el.style.left = arr[i].x+"px";
        arr[i].el.style.top = arr[i].y+"px";
      }
    }
  }
}
//Adds and removes lanes
function modLanes(arr){
  if(arr[arr.length-1].y >= pos.top){
    arr.push(new Lane(arr[arr.length-1].y-LaneSize));
    addElement(arr,arr.length-1);
  }
  if(arr[0].y>= pos.bottom){
    clearInterval(arr[0].carInterval);
    for(var i = 0; i < arr[0].cars.length; i ++){
      game.removeChild(arr[0].cars[i].el);
    }
    arr[0].cars = [];
    game.removeChild(arr[0].el);
    arr.shift();
  }
}
//Creates a lane element and adds it to game
//Manually setting coords might not be good but it works
function addElement(arr,i){
  var image = document.createElement("div");
  image.style.position = "absolute";
  image.style.left = pos.left+"px";
  image.style.top = arr[i].y+"px";
  image.style.width = game.offsetWidth+"px";
  image.style.height = LaneSize+"px";
  if(arr[i].type > 2){
    image.style.backgroundColor = "lightgreen";
  }
  if(arr[i].type > 1 && arr[i].type < 2){
    image.style.backgroundColor = "lightblue";
  }
  if(arr[i].type > 0 && arr[i].type < 1){
    image.style.backgroundColor = "gray";
  }
  arr[i].el = image;
  game.append(image);
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
  backgroundMove(arr);
  modLanes(arr);
  for(var i = 0; i < arr.length; i ++){
    if(arr[i].y == chicken.y){
      collision(arr[i].cars);
    }
  }
  animationId = requestAnimationFrame(function() { animate(arr); });
}
function chicken(){
  this.x = pos.left + pos.width/2 - LaneSize/4;
  this.y = pos.bottom - LaneSize;
  this.el = document.createElement("div");
  this.el.style.position = "absolute";
  this.el.style.left = this.x+"px";
  this.el.style.top = this.y+"px";
  this.el.style.width = LaneSize/2+"px";
  this.el.style.height = LaneSize/2+"px";
  this.el.style.backgroundColor = "white";
  this.el.style.zIndex = 1;
  game.append(this.el);
}
function collision(arr){
  for(var i = 0; i < arr.length; i ++){
    if((chicken.x > arr[i].x && chicken.x < arr[i].x + carW) || (chicken.x + LaneSize/2 > arr[i].x && chicken.x + LaneSize/2 < arr[i].x + carW)){
      playing = false;
      return;
    }
  }
}
main()