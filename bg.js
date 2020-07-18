const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const image = new Image();
    // Image 대문자 조심
    image.src = `./image/${imgNumber}.jpg`;
    image.classList.add("bgImage")
    body.appendChild(image);
}

function getRandomNumber(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = getRandomNumber();
    paintImage(randomNumber);
}

init();