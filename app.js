const gameSection = document.getElementById('game-section');
const resultSection = document.getElementById('result-section');
const rulesSection = document.getElementById('rules-section');
const showRulesBtn = document.getElementById('show-rules');
const closeRulesBtn = document.getElementById('close-rules');
const gameItems = gameSection.querySelectorAll('[data-item]');
const playAgainBtn = document.getElementById('play-again');
const scoreElement = document.getElementById('score');
const originalPage = document.documentElement.innerHTML;
let score = 0;

if(localStorage.getItem('score') != null){
    score = localStorage.getItem('score');
}
scoreElement.textContent = score;


function handlePick(){
    const gameSectionRect = gameSection.getBoundingClientRect();
    const picked = resultSection.querySelector('#picked');
    const pickedItem = this.cloneNode(true);
    document.querySelector('body').appendChild(pickedItem);

    pickedItem.style.left = `${this.offsetLeft + gameSectionRect.left}px`;
    pickedItem.style.top = `${this.offsetTop + gameSectionRect.top}px`;

    resultSection.classList.remove('hidden');
    gameSection.classList.add('hidden');

    const pickedRect = picked.getBoundingClientRect();

    pickedItem.animate({
        transform: "translate(0)",
        left: `${pickedRect.left}px`,
        top: `${pickedRect.top}px`,
        width: `${pickedRect.width}px`,
        innerHeight: `${pickedRect.height}px`,
    }, 300);
    setTimeout(() => {
        pickedItem.style.width = '100%';
        pickedItem.style.height = '100%';
        pickedItem.style.top = '0';
        pickedItem.style.left = '0';
        pickedItem.style.transform = 'translate(0)';
        document.querySelector('body').removeChild(pickedItem);
        picked.appendChild(pickedItem);
    }, 300);

    handleResult(pickedItem.dataset.item);
}

function handleResult(pickName){
    const randomPick = gameItems[Math.floor(Math.random() * gameItems.length)].cloneNode(true);
    const housePick = resultSection.querySelector('#house-pick');
    const result = resultSection.querySelector('#result');

    randomPick.style.width = '100%';
    randomPick.style.height = '100%';
    randomPick.style.top = '0';
    randomPick.style.left = '0';
    randomPick.style.transform = 'translate(0)';

    setTimeout(() => {
        housePick.appendChild(randomPick);
        result.classList.remove('hidden');
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
    location.reload();
}

showRulesBtn.addEventListener('click', () => rulesSection.classList.remove('hidden'));
closeRulesBtn.addEventListener('click', () => rulesSection.classList.add('hidden'));
playAgainBtn.addEventListener('click', playAgain);
gameItems.forEach(item => item.addEventListener('click', handlePick));