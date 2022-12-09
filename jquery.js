var playing = false;
var score;
var trialsLeft;
var fruits = ['apple','banana','cherries','durian','grapes','orange','papaya','peach','pear','pineapple','watermelon'];
var step;
var action;
var blink;





$(function(){
    
    $("audio").prop('volume',0.1);
    $("#muteButton").click(function(){
        if($("audio").prop('muted')){
            $("audio").prop('muted',true);
            $("#muteButton").attr('src' , './img/unmute.png');
            $("audio").prop('muted',false);
        }
        else{
            $("audio").prop('muted',false);
            $("#muteButton").attr('src' , './img/mute.png');
            $("audio").prop('muted',true);
        }
    });
    
    $("#startreset").click(function(){
        
        $("#gameOver").hide();
        
        //we are playing
        if(playing == true){
            //reload page
            location.reload();


        }
        else{
            //we are not playing
            playing = true;     //game is started
            // set score to 0
            score = 0;      //set score to 0
            $("#scorevalue").html(score);

            //show trails left
            $("#trialsLeft").show();

            trialsLeft = 3;
            addHearts();

            //change button text to reset game
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();

        } //end of else
    }); //end of click

//slice a fruit

$("#fruit1").mouseover(function(){

    score++; //add score value by one

    $("#scorevalue").html(score); //update score

    //  document.getElementById("slicesound").play();
      $("#slicesound")[0].play();   // play sound
    
    // explode fruit
    clearInterval(action); //stopping the fruit

    $("#fruit1").effect("explode", {pieces:16, mode:"hide"}, 500, startAction);
    // jQuery UI Explode Effect | jQuery UI Explode Animation Effect - jQuery UI Tutorial 25
    // https://www.youtube.com/watch?v=yWLWaK5kdm0
 

}); //end slice fruit function

function addHearts(){

    $("#trialsLeft").empty(); //empty the trialsLeft hearts

    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="img/heart.png" class="life">');
    }
}

//start sending fruits
function startAction(){
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -100});
    // random horizontal position

    //generate random steps
    step = 1+ Math.round(5*Math.random());

    //move down fruits by 10ms each step
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        //check if too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 0){
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -100});
                // random horizontal position
            
                //generate random steps
                step = 1+ Math.round(5*Math.random());

                //reduce trails by one
                trialsLeft --;

                //populate trialsLeft box
                addHearts();

                if(trialsLeft == 0){

                    //blink the #trialsLeft box
                    blink = setInterval(function(){
                        $("#trialsLeft").toggleClass("class2");
                        },100)
                }//check trials left = 0

            }//check trials left > 1

            else{
                playing = false;

                              
                $("#startreset").html("Start Game");

                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your Score is '+ score +'</p>');

                $("#trialsLeft").hide();

                stopAction();

            }//no trails left, game over
        } //if too low

    },10); //random steps every 10ms
}

// generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src' , 'img/' + fruits[Math.round(10*Math.random())] + '.png');
}

//stop dropping fruits
function stopAction(){
    
    
    clearInterval(action); //stopping the fruit
       
    clearInterval(blink); //stopping the blink
}



}); // end of function