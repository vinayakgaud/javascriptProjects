const playerOne = Math.floor((Math.random()*6)+1)
const playerTwo = Math.floor((Math.random()*6)+1)

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#diceOne').setAttribute('src',`images/dice${playerOne}.png`)
    document.querySelector('#diceTwo').setAttribute('src',`images/dice${playerTwo}.png`)
    const output = document.querySelector('#output');
    if(playerOne > playerTwo){
        output.textContent = 'Player One Wins'
    }else if(playerOne < playerTwo){
        output.textContent = 'Player Two Wins'
    }else{
        output.textContent = 'Draw'
    }
})
