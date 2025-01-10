let LaneSize = 30;
//Gets the game element/box
let game = document.getElementById("game");
//Gets the height of the game
let height = game.offsetHeight;
//Gets the coordinates with top left corner as origin
let pos = game.getBoundingClientRect();
function Lane(ycor){
  this.type = Math.random()*3;
  this.direction = Math.random();
  this.y = ycor;
  this.el = null;
}
function main(){
  var lanes = [];
  initialize(lanes);
  animate(lanes);
}
function initialize(arr){
  for(var i = 0; i < Math.ceil(height/LaneSize);i ++){
    arr.push(new Lane(pos.bottom-LaneSize*(i+1)));
    addElement(arr,i);
  }
}
//Increments the lane y-cor and updates the actual element on html
function backgroundMove(arr){
  for(var i = 0; i < arr.length; i ++){
    arr[i].y ++;
    var el = arr[i].el;
    el.style.top = arr[i].y + "px";
  }
}
//Adds and removes lanes
function modLanes(arr){
  if(arr[arr.length-1].y >= pos.top){
    arr.push(new Lane(arr[arr.length-1].y-LaneSize));
    addElement(arr,arr.length-1);
  }
  if(arr[0].y + LaneSize >= pos.bottom){
    arr.shift();
    game.removeChild(game.firstChild);
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
  backgroundMove(arr);
  modLanes(arr);
  requestAnimationFrame(function() { animate(arr); });
}