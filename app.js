const gameSection = document.getElementById('game-section');
const resultSection = document.getElementById('result-section');
const rulesSection = document.getElementById('rules-section');
const showRulesBtn = document.getElementById('show-rules');
const closeRulesBtn = document.getElementById('close-rules');
const gameItems = gameSection.querySelectorAll('[data-item]');
const playAgainBtn = document.getElementById('play-again');
const scoreElement = document.getElementById('score');
const housePick = resultSection.querySelector('#house-pick');
const picked = resultSection.querySelector('#picked');
const result = resultSection.querySelector('#result');
let score = 0;

if(localStorage.getItem('score') != null){
    score = localStorage.getItem('score');
}
scoreElement.textContent = score;


function handlePick(){
    const gameSectionRect = gameSection.getBoundingClientRect();
    const pickedItem = this.cloneNode(true);
    picked.appendChild(pickedItem);
    const desiredLeft = this.offsetLeft + gameSectionRect.left;
    const desiredTop = this.offsetTop + gameSectionRect.top;
    
    resultSection.classList.remove('hidden');
    gameSection.classList.add('hidden');

    pickedItem.style.left = `${desiredLeft - picked.offsetLeft}px`;
    pickedItem.style.top = `${desiredTop - picked.offsetTop}px`;

    console.log(picked.getBoundingClientRect());
    console.dir(picked);


    pickedItem.animate({
        width : `${picked.offsetWidth}px`,
        top : '0',
        left : '0',
        transform : 'translate(0)',
    }, {duration: 500, fill: 'forwards'});

    handleResult(pickedItem.dataset.item);
}

function handleResult(pickName){
    const randomPick = gameItems[Math.floor(Math.random() * gameItems.length)].cloneNode(true);

    randomPick.style.width = '100%';
    randomPick.style.height = '100%';
    randomPick.style.top = '0';
    randomPick.style.left = '0';
    randomPick.style.transform = 'translate(0)';

    setTimeout(() => {
        housePick.appendChild(randomPick);
        result.classList.remove('hidden');
        resultSection.classList.add('show-result');
        const resultHeader = result.querySelector('#result-header');
        const gameResult = getResult(pickName, randomPick.dataset.item)
        resultHeader.textContent = gameResult;
        if(gameResult == 'you win'){
            localStorage.setItem('score', ++score);
            resultSection.querySelector('#win-effect').classList.remove('hidden');
        }else if(gameResult == 'you lose'){
            localStorage.setItem('score', score > 0 ? --score : score);
            resultSection.querySelector('#lose-effect').classList.remove('hidden');
        }
        scoreElement.textContent = score;
    }, 2000);
}

function getResult(userPick, housePick){
    if(userPick === housePick){
        return 'draw';
    }
    if(userPick === 'scissors') {
        if(['paper', 'lizard'].includes(housePick)){
            return 'you win';
        }
    }
    if(userPick === 'paper'){
        if(['rock', 'spock'].includes(housePick)){
            return 'you win';
        }
    }
    if(userPick === 'rock'){
        if(['scissors', 'lizard'].includes(housePick)){
            return 'you win';
        }
    }
    if(userPick === 'lizard'){
        if(['paper', 'spock'].includes(housePick)){
            return 'you win';
        }
    }
    if(userPick === 'spock'){
        if(['scissors', 'rock'].includes(housePick)){
            return 'you win';
        }
    }
    return 'you lose';
}

function playAgain(){
    //Show game again
    gameSection.classList.remove('hidden');

    // Clear effects
    document.querySelector('#win-effect').classList.add('hidden');
    document.querySelector('#lose-effect').classList.add('hidden');

    //Clear Picks
    housePick.removeChild(housePick.lastChild);
    picked.removeChild(picked.lastChild);

    // Clear results
    resultSection.classList.add('hidden');
    resultSection.classList.remove('show-result');
    result.classList.add('hidden');
}

showRulesBtn.addEventListener('click', () => rulesSection.classList.remove('hidden'));
closeRulesBtn.addEventListener('click', () => rulesSection.classList.add('hidden'));
playAgainBtn.addEventListener('click', playAgain);
gameItems.forEach(item => item.addEventListener('click', handlePick));