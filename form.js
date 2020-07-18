const userForm = document.querySelector(".js-form"),
    userInput = userForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
// index에서 요소들을 불러옴

const USER_LOCAL_STORAGE = "currentUser",
    SHOWING_ON = "showing";
// 추가할 요소들을 변수로 만들어 놓음

function saveName(text){
    localStorage.setItem(USER_LOCAL_STORAGE, text);
    // 이름을 Local storage에 저장, Application에서 확인가능
    // key = currentUser, value = text;
}

function handleSubmit(event){
    event.preventDefault();
    // form의 기본 이벤트를 막음, enter시 페이지 새로고침 x
    const currentValue = userInput.value;
    paintingGreeting(currentValue);
    // 기존 form의 이벤트를 막고 새로운 이벤트 paintingGreeting 실행
    saveName(currentValue);
}

function askForName(){
    userForm.classList.add(SHOWING_ON);
    userForm.addEventListener("submit", handleSubmit);
    // addEventListner에서 함수는 ()를 안붙임, 안붙여야 이벤트가 발생할 때 실행한다는 뜻, 붙이면 항상 실행임
}

function paintingGreeting(text){
    userForm.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LOCAL_STORAGE);
    if(currentUser === null){
        askForName();
    }
    else {
        paintingGreeting(currentUser);
    }
}

loadName();