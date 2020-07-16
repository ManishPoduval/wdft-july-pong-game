let canvas = document.getElementById('myCanvas')
canvas.style.backgroundColor = '#1e2433';

let ctx = canvas.getContext('2d')

let ballColor = '#e66b29'
let ballX = 100 //circles x position
let ballY = 100//circles y position
let ballRadius = 20 //circles radius

let ballXincrement = 5
let ballYincrement = 5

let paddleX = 100
let paddleWidth = 100
let paddleHeight = 20
let paddleColor = '#65c2bd'
let isRightArrow = false;
let isLefttArrow = false;

let score = 0;
let intervalId = 0;


function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = ballColor
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function ballCollision(){
    //right
    if (ballX > canvas.width - ballRadius){
        ballXincrement = -5
    }

    //left
    else if (ballX - ballRadius < 0){
        ballXincrement = 5
    }

    //bottom
    if (ballY > canvas.height - ballRadius){
        if (ballX > paddleX && ballX < paddleX + paddleWidth ){
            ballYincrement = -5
            score++
        }
        else{
            clearInterval(intervalId)
            alert('GAME OVER')
        }
       
    }

    //top
    else if (ballY - ballRadius < 0){
        ballYincrement = 5
    }
}

document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowRight'){
        isRightArrow = true;
        isLefttArrow = false
    } 
    else if (event.key === 'ArrowLeft'){
        isLefttArrow= true; 
        isRightArrow = false;
    } 
})

document.addEventListener('keyup', function(event){
    isRightArrow = false;
    isLefttArrow = false;
})


function drawPaddle(){
    ctx.beginPath();
    ctx.fillStyle = paddleColor
    ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.closePath();
}

function paddleMovement(){
    if (isRightArrow && paddleX < canvas.width - paddleWidth){
        paddleX = paddleX + 5
    }
    else if (isLefttArrow && paddleX > 0){
        paddleX = paddleX - 5
    }
}

function printScore(){
    ctx.font = '18px Verdana'
    ctx.fillText('Score: '+score, 20, 20)
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    ballCollision();
    drawPaddle();
    printScore();
    paddleMovement()
    ballX += ballXincrement
    ballY += ballYincrement
}


intervalId = setInterval(() => {
    requestAnimationFrame(draw)
}, 20)