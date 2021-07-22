var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started = false;

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text( "Level "+ level);
    var randomNum = Math.floor(Math.random()*4);
    var randomColor = buttonColours[randomNum];
    gamePattern.push(randomColor);

    //animation and sound of pattern button;
    $("#"+randomColor).fadeOut(200).fadeIn(200);
    playSound(randomColor);
}

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer();
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){ 
        $("#"+color).removeClass("pressed");
}, 100);
}


function checkAnswer() {
    if(gamePattern[index]==userClickedPattern[index] && gamePattern.length == userClickedPattern.length){
        index = 0;
        setTimeout(function(){
            nextSequence();
        }, 1000);
        
    }
    else if(gamePattern[index]!=userClickedPattern[index]){
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("You have reached only level " + level + ". Press any key if you want to play again!");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        restart();
        
    }
    else{
        index++;
    }
}
function startGame() {
    $(document).on("keypress", function(e){
        if(e.key == "a" && !(started)){
            started = true;
            nextSequence();
        }
    })
}


function restart() {
    gamePattern = [];
    level = [];
    userClickedPattern = [];
    index = 0;
    started = false
    $(document).on("keypress", function(e){
        if(!(started)){
            started = true;
            nextSequence();
        }
})}

startGame();