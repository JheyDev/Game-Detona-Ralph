const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesText: document.querySelector(".menu-lives h2"), 
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3, 
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        resetGame();
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; 
}

function moveEnemy(){
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id == state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("crack");

                if (state.values.result >= 10) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    playSound("win"); 
                    setTimeout(() => {
                        alert("🏆 Você ganhou! O seu resultado foi: " + state.values.result);
                        resetGame();
                    }, 100); 
                }
            } else {
                state.values.lives--; 
                state.view.livesText.textContent = `X${state.values.lives}`; 
                if (state.values.lives <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    playSound("gameOver"); 
                    setTimeout(() => {
                        alert("Game Over! Você perdeu todas as suas vidas.");
                        resetGame();
                    }, 100);
                }
            }
        });
    });
}

function resetGame() {
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.curretTime = 60;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.values.lives = 3; 
    state.view.livesText.textContent = `X${state.values.lives}`; 
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
}

function initialize() {
    addListenerHitBox();
    resetGame();
}

initialize();
