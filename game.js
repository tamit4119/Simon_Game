var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var canRestart = true;

function startGame() {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
}

$(document).keypress(function() {
    if (!started && canRestart) {
        startGame();
    }
});

$(document).on("click touchstart", function() {
    if (!started && canRestart) {
        startGame();
    }
});

$(".btn").click(function() {
    if (!started) return; // Prevent input if not started
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Game Over triggered");
        $("#level-title").text("Game Over, Press Any Key or Tap Anywhere to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        canRestart = false;
        started = true; // Prevent further input until lockout is over
        setTimeout(function() {
            $("body").removeClass("game-over");
            canRestart = true;
            started = false; // Now allow restart
        }, 1000);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
