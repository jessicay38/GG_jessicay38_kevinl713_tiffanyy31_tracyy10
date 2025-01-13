// load the chicken
chicken_img = document.querySelector(".chicken");
// chicken_img.style.marginTop = "200px";
// console.log("recognized");

function makeMove(e){
    if (e === "w") {
        chicken_img.style.marginTop = (chicken_img.style.marginTop.substring(0, chicken_img.style.marginTop.length-2) - 50) + "px";
        console.log(chicken_img.style.marginTop);
        console.log("moved: UP");
        return;
        }
    if (e === "s") {
        chicken_img.style.marginTop = (chicken_img.style.marginTop.substring(0, chicken_img.style.marginTop.length-2) - (-50)) + "px";
        console.log(chicken_img.style.marginTop);
        console.log("moved: DOWN");
        return;
        }
    if (e === "a") {
        chicken_img.style.marginLeft = (chicken_img.style.marginLeft.substring(0, chicken_img.style.marginLeft.length-2) - 50) + "px";
        console.log(chicken_img.style.marginLeft);
        console.log("moved: LEFT");
        return;
        }
    if (e === "d") {
        chicken_img.style.marginLeft = (chicken_img.style.marginLeft.substring(0, chicken_img.style.marginLeft.length-2) - (-50)) + "px";
        console.log(chicken_img.style.marginLeft);
        console.log("moved: RIGHT");
        return;
        }
    console.log("illegal move!");
    return;
    }
document.addEventListener("keypress", (event) => {makeMove(event.key);});