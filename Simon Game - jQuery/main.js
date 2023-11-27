const buttonColors = ['red','blue','green','yellow']
const gamePattern = [];
const userClickedPattern = [];
let level = 0; 
let gameStarted = false;
let currentScore = 0;
let highestScore = 0;

$('.btn').click((e)=>{
    const userChosenColour = $(e.currentTarget).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
})

const nextSequence = ()=>{
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $(`#${randomChosenColor}`).addClass('flash')
    setTimeout(()=>{
        $(`#${randomChosenColor}`).removeClass('flash')
    },1000)
    playSound(randomChosenColor) 
    level+=1;
    $('#level-title').text(`Level: ${level}`)
}

const playSound = (name) =>{
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatePress = (currentColor)=>{
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(()=>{
        $(`#${currentColor}`).removeClass('pressed')
    },100)
}

$(document).on('keypress',()=>{
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    }
})

const checkAnswer = (currentLevel)=>{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence()
                userClickedPattern.splice(0, userClickedPattern.length);
            },1000)
            currentScore += 1;
            highestScore = Math.max(highestScore, currentScore);
            $('#currentScore').text(`Current Score: ${currentScore}`);
            $('#highestScore').text(`Highest Score: ${highestScore}`);
        }
    }else{
        playSound('wrong')
        $('body').addClass('game-over');
        setTimeout(()=>{
            $('body').removeClass('game-over');
        },200)
        $('#level-title').text('Game Over, Press Any Key to Restart')
        gamePattern.splice(0, gamePattern.length);
        userClickedPattern.splice(0, userClickedPattern.length);
        gameStarted = false; 
        level = 0;
        currentScore = 0;
        $('#currentScore').text(`Current Score: ${currentScore}`);
    }
} 