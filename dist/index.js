var numSquares = 6;
var colors = [];
var pickedColor;

var startBtn = document.getElementById("start");
var squares = document.querySelectorAll(".square");
var h1=document.getElementById("intro");
var messageDisplay = document.getElementById("message");
var resetBtn = document.getElementById("reset");
var hide;
var show;
var game;


startBtn.addEventListener("click",function(){
    init();
})

resetBtn.addEventListener("click",function(){
    for (var i = 0; i < squares.length; i++){
        // Removes all the hidden class and event listeners from squares
        squares[i].classList.remove("color-hidden");
        squares[i].removeEventListener("click",check);
    }
    h1.style.backgroundColor = "#4682b4";
    messageDisplay.textContent = "";
    init();
})

function init(){
    prep();
    updateH1();
    showColors();
    // Add gameplay after a timer
    hide = setTimeout(hideColors, 5000);
    show = setTimeout(colorDisplay, 5000);
    game = setTimeout(play, 5000);
}

function prep(){
    // Remove timers of all functions
    clearTimeout(hide);
    clearTimeout(show);
    clearTimeout(game);
    startBtn.style.visibility = "hidden";
    resetBtn.style.visibility = "visible";
}

function updateH1(){
    h1.textContent = "Memorise the color positions\r\n before they dissapear!";
}

function showColors(){
    // generate all new colors
    colors = generateRandomColors(numSquares);
    // change colors of square
    for(var i =0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } 
        else{
            squares[i].style.display = "none";
        }
    }
}


function generateRandomColors (num){
    // make an array
    var arr = [];
    // repeat num times
    for (var i = 0; i < num; i++){
        // get random color and push into array
        arr.push(randomColor());         
    }
    // return array
    return arr;
}

function randomColor(){
    // pick a "red" value from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // pick a "green" value from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // pick a "blue" value from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor(){
    // pick a random sequence from the array
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function hideColors(){
    // Add hide class to all squares
    for(var i =0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].classList.add("color-hidden");
        } 
        else{
            squares[i].style.display = "none";
        }
    }
}

function colorDisplay(){
    pickedColor = pickColor();
    h1.style.backgroundColor = pickedColor;
    h1.textContent = "LOOK FOR \r\n THIS COLOR!"
}

function play(){
    for(var i = 0; i<squares.length; i++){
        // add click listeners to squares
        squares[i].addEventListener("click",check);
    }

}

function check(){
    this.classList.remove("color-hidden");
    // grab color of clicked square
    var clickedColor = this.style.backgroundColor;
    // compare color to pickedColor
    if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        h1.textContent = "Congratulations\r\n You got it";
        changeColors(clickedColor);
    }
    else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
    }
}

function changeColors(color){
    // loop through all the colors
    for (var i = 0; i < squares.length; i++){
        //check for hidden class and change color
        squares[i].classList.remove("color-hidden");
        squares[i].style.backgroundColor = color;
    }
}