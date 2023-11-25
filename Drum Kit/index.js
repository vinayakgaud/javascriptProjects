//collection all drum elemt together
const drumButtons = document.querySelectorAll('.drum');

const makeSound = (key)=>{
    switch(key){
        case 'w':
            const crashAudio = new Audio('sounds/crash.mp3')
            crashAudio.play();
            break;
        case 'a':
            const kickAudio = new Audio('sounds/kick-bass.mp3')
            kickAudio.play();
            break;
        case 's':
            const snareAudio = new Audio('sounds/snare.mp3')
            snareAudio.play();
            break;
        case 'd':
            const tom1Audio = new Audio('sounds/tom-1.mp3')
            tom1Audio.play();
            break;
        case 'j':
            const tom2Audio = new Audio('sounds/tom-2.mp3')
            tom2Audio.play();
            break;
        case 'k':
            const tom3Audio = new Audio('sounds/tom-3.mp3')
            tom3Audio.play();
            break;
        case 'l':
            const tom4Audio = new Audio('sounds/tom-4.mp3')
            tom4Audio.play();
            break;
        default:
            null;
    }
}

const buttonPressed = (key)=>{
    if(key === 'w' || key === 'a' || key === 's' || key === 'd' || key === 'j' || key === 'k' || key === 'l'){
        const button = document.querySelector(`.${key}`);
        button.classList.add('pressed');
        setTimeout(()=>{
            button.classList.remove('pressed');
        },100)
    }else{
        null;
    }
}

for(let i of drumButtons){
    i.addEventListener('click',()=>{
        makeSound(i.textContent);
        buttonPressed(i.textContent)
    })
}

document.addEventListener('keydown', (e)=>{
    makeSound(e.key);
    buttonPressed(e.key)
})