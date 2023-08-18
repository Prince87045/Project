let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function (){
    if(started == false){
        console.log("key pressed");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
} 

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
} 

function levelUp(){
    level++;
    userseq = [];
    h2.innerText = `Level ${level}`;

    //choose a random button
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        } 
    } else {
        if(level == 0) level =1 ; //print score 0 (otherwise it will print -1)
        h2.innerHTML = `Game over ! Your score was <b>${level-1}<b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white"}
            ,200);
        reset();
    }
}

function btnPress(){
    let btn =this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    level = 0 ;
    started = false;
    userseq = [];
    gameseq = [];
}
