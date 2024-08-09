const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let dinoPosition = 20; // Posição inicial do dinossauro
let dinoSpeed = 10; // Velocidade do movimento do dinossauro

function jump() {
    if (isJumping) return;
    isJumping = true;
    dino.style.transition = 'all 0.3s ease';
    dino.style.bottom = '150px';
    setTimeout(() => {
        dino.style.bottom = '20px';
        setTimeout(() => {
            isJumping = false;
        }, 300);
    }, 300);
}

function moveDino(direction) {
    const containerWidth = window.innerWidth;
    const dinoWidth = dino.offsetWidth;
    const step = 20; // Distância que o dinossauro se move a cada tecla pressionada

    if (direction === 'left') {
        dinoPosition -= step;
        if (dinoPosition < 0) dinoPosition = 0; // Impede que saia da tela
    } else if (direction === 'right') {
        dinoPosition += step;
        if (dinoPosition > containerWidth - dinoWidth) dinoPosition = containerWidth - dinoWidth; // Impede que saia da tela
    }
    dino.style.left = `${dinoPosition}px`;
}

function moveObstacle() {
    let position = window.innerWidth;
    const interval = setInterval(() => {
        if (position < -50) {
            position = window.innerWidth;
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            position -= 5;
        }
        obstacle.style.left = `${position}px`;

        if (
            position < dinoPosition + dino.offsetWidth &&
            position + obstacle.offsetWidth > dinoPosition &&
            parseInt(dino.style.bottom) < 70
        ) {
            clearInterval(interval);
            alert('Game Over');
            window.location.reload();
        }
    }, 20);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    } else if (e.code === 'ArrowLeft') {
        moveDino('left');
    } else if (e.code === 'ArrowRight') {
        moveDino('right');
    }
});

moveObstacle();
