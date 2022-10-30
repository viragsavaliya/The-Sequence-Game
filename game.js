var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// if (!started) {
//    $(document).one("keypress", function(e) {
//       if (e.key == " ") {
//          $("#level-title").text("Level " + level);
//          nextSequence();
//          started = true;
//       }
//    });
// }

if($(window).innerWidth() < 768) {
   $("#level-title").text("Click start to begin!")
}

if ($(window).innerWidth() > 768) {
   $(document).keypress(function() {
     if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
       console.log(started);
     }
   });
}

if ($(window).innerWidth() < 768) {
   $(".mobile-start-button").on("click", function() {
      if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
       alert("started");
     }
   });
}

$(".btn").on("click", function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});


function nextSequence() {

   level++;
   userClickedPattern = [];

   $("#level-title").text("Level " + level);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   gamePattern.push(randomChosenColour);

   playSound(randomChosenColour);
}


function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
      var count = 0;
      for (var i = 0; i < gamePattern.length; i++) {
         if (gamePattern[i] == userClickedPattern[i]) {
            count++;
         }
      }
      if (count == gamePattern.length){
         console.log("Correct")
         setTimeout(function() {
            nextSequence();
         },1000);
      }
   } else {
      console.log("Incorrect");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      },1000);
      $("h1").text("Game Over, Press spcae key to restart");
      startOver();
   }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}
