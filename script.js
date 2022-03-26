// alert("js connected");
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBound = board.getBoundingClientRect();
let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;

// user input listen 
document.addEventListener('keydown', function(e){
    
    if (e.key=="w"){
        movePaddle(leftPaddle, -window.innerHeight*0.1);
    }else if (e.key=="s"){
        movePaddle(leftPaddle, window.innerHeight*0.1);
    }else if (e.key=="ArrowUp"){
        movePaddle(rightPaddle, -window.innerHeight*0.1);
    }else if (e.key=="ArrowDown"){
        movePaddle(rightPaddle, window.innerHeight*0.1);
    }
})

function setColor(idx) {
    let allicons = document.querySelectorAll(".fas");
    allicons[idx].style.color = "red";
}

function resetgame() {
    ball.style.top = 45+"vh";
    ball.style.left = 50+"vh";
    requestAnimationFrame(moveBall);
}

function movePaddle(cPaddle, change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change >= boardBound.top && cPaddleBounds.bottom+change <= boardBound.bottom){
        cPaddle.style.top = cPaddleBounds.top + change + "px";
    }
}



function moveBall(){
    let ballcord = ball.getBoundingClientRect();
    let ballTop = ballcord.top;
    let ballLeft = ballcord.left;
    let ballBottom = ballcord.bottom;
    let ballRight = ballcord.right;

    let hasTouchedLeft = ballLeft <= boardBound.left;
    let hasTouchedRight = ballRight >= boardBound.right;

    if (hasTouchedLeft || hasTouchedRight) {
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            // console.log(leftPlayerLives);
            if (leftPlayerLives===0){
                alert("Game Over! Right Player Won");
                location.reload();
            } else {
                return resetgame();
            }
        } else {
            rightPlayerLives--;
            setColor(3+rightPlayerLives);
            // console.log(rightPlayerLives);
            if (rightPlayerLives===0){
                alert("Game Over! Left Player Won");
                location.reload();
            } else {
                return resetgame();
            }
        }
    }

    //handleverticalbound
    if (ballTop<=boardBound.top || ballBottom>=boardBound.bottom){
        //verticaloutside
        y = !y;
    }

    // //handlehorizontalbound
    // if (ballLeft<=boardBound.left || ballRight>=boardBound.right){
    //     //horizontaloutside
    //     x = !x;
    // }

    //collision *********************
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();

    if (ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30 >= leftPaddleBounds.top && ballBottom-30 <= leftPaddleBounds.bottom) {
        x = !x;
    }

    if (ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30 >= rightPaddleBounds.top && ballBottom-30 <= rightPaddleBounds.bottom) {
        x = !x;
    }
    //collision *********************

    ball.style.top = y == true?(ballTop+4+"px"):(ballTop-4+"px");
    ball.style.left = x == true?(ballLeft+4+"px"):(ballLeft-4+"px");
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);