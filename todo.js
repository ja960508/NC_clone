const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
// 1. html에서 요소 받아오기

const TODO_LS = "toDoStore";
let toDoArray = [];
// 값을 저장할 배열 선언
// 나중에 삭제할 시 수정해야 하기 때문에 let으로 선언

function deleteToDo(event){
    // console.log(event.target.parentNode);
    // 어떤 Node가 삭제되어야 하는지 알아야 함
    const btn = event.target;
    const li = btn.parentNode;

    const cleanToDos = toDoArray.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        // li.id 는 string값이기 때문에 Int로 형변환해준다.
    })
    toDoList.removeChild(li);
    // HTML내에서 삭제, LS에서도 삭제 해야함
    // li와 id가 같지 않은 arr를 반환함
    // console.log(cleanToDos);
    toDoArray = cleanToDos;
    saveToDo();
}

function paintToDo(text){
    console.log(text);
    const li = document.createElement("li");
    // 요소 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const toDoId = toDoArray.length;
    const toDoObj = {
        text: text,
        id: toDoId
    };
    
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", deleteToDo);
    // 삭제를 위한 이벤트 추가
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = toDoId;
    // 딜리트 시 어떤 리스트를 삭제할지 결정
    toDoList.appendChild(li);
    // appendChild 부모 요소에 해당 값 추가하는 함수
    toDoArray.push(toDoObj);
    saveToDo();
    // push 후에 호출
}

function saveToDo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDoArray));
    // Local Storage에는 string형식 밖에 저장할 수 없기 때문에 JSON으로 형변환
    // JSON : JavaScript Object Notation
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}

function loadToDo(){
    const toDos = localStorage.getItem(TODO_LS);
    
    if(toDos !== null){
        const parseToDos = JSON.parse(toDos);
        parseToDos.forEach(function(toDo){
            // toDo는 parseToDos안에 있는 요소들 각각을 지칭
            // function은 바깥에서 끌어다 써도 가능
            paintToDo(toDo.text);
        })
    }
    // 비어있지 않다면 기존 리스트 불러오기
}

// 2. 초기함수 만들기, 값이 있으면 불러와야 하기 때문에 LOAD함수 설정
function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
