let canvas = document.getElementById("tdgame");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let row = 10;
let col = 10;
let width = Math.floor(canvas.width/10);
let height = Math.floor(canvas.height/10);
let grid = Array.from(Array(row), () => new Array(col));
let lastNode = null;
let startNode = null;
let buildMode = false;
let enemies = [];
let wave;
let money;
let hp;
let mouseX = 0;
let mouseY = 0;
function main(){
  setup();
}
function setup(){
  for(var i = 0; i < row; i++){
    for(var a = 0; a < col; a ++){
      grid[i][a] = new tile(a*width,i*height);
    }
  }
}
function tile(x,y){
  this.x = x;
  this.y = y;
  this.node = null;
}
function getTile(x,y){
  return grid[Math.round(y/row)][Math.round(x/col)];
}
function linkedNode(){
  this.next = null;
  this.x;
  this.y;
}
function isNeighbor(x,y){
  var curr = getTile(x,y);
  if(lastNode.x == curr.x){
    if(Math.abs(lastNode.y - curr.y) == row){
      //true
    }
    else{
      //false
    }
  }
  if(lastNode.y == curr.y){
    if(Math.abs(lastNode.x - curr.x) == col){
      //true
    }
    else{
      //false
    }
  }
}
function towerNode(id){
  this.id = id;
  if(id == 1){
    this.range = 0;
    this.speed = 0;
    this.dmg = 0;
  }
}
function upgrade(tower){
  rand = Math.random()*3;
  if(rand > 2){
    tower.range += 10;
  }
  else if(rand > 1){
    tower.speed += 2;
  }
  else{
    tower.dmg += 1;
  }
}
function enemy(){
  this.hp = 5;
  this.speed = 1;
  this.x = startNode.x;
  this.y = startNode.y;
}
document.addEventListener("keydown", function(event) {
  if(event.key == "b"){
    buildMode = !buildMode;
  }
  //left mouse click
  if(event.key == "a" && buildMode){
    getTile();
  }
});
canvas.addEventListener("mousemove", function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  mouseX = x;
  mouseY = y;
  console.log("Mouse Position:", mouseX, mouseY);
});
main()