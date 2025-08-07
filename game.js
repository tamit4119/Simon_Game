var gamePattern = [] ;
var userClickedPattern = [] ;

var buttonColours = ["red", "blue", "green", "yellow"] ;

var level = 0;
var started = false;
var canRestart = true; // New flag to prevent instant restart

$(document).keypress(function() {

    if (!started && canRestart) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
    
});

// Allow tap/click anywhere to start/restart the game (for mobile)
$(document).on("click touchstart", function() {
    if (!started && canRestart) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id") ;
    userClickedPattern.push(userChosenColour) ;

    playSound(userChosenColour) ;
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {

        $("#level-title").text("Game Over, Press Any Key or Tap Anywhere to Restart");

        playSound("wrong");

        $("body").addClass("game-over");

        canRestart = false; // Prevent instant restart
        setTimeout(function() {
            $("body").removeClass("game-over");
            canRestart = true; // Allow restart after 1 second
        }, 1000);

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++ ;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour) ;
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) ;
}


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3") ;
  audio.play() ;
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
