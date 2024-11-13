const inputValue = document.getElementById("inputValue");
const mainTodoElement = document.querySelector('.todo-lists-elem');

const getTodoListfromLocal = ()=>{
    return JSON.parse(localStorage.getItem("todoList"));
}

const addTodoListLocalStorage = (localTodoLists)=>{
    return localStorage.setItem("todoList", JSON.stringify(localTodoLists));
}
let localTodoLists = getTodoListfromLocal() || [];

const addTodoDynamicElement = (curElem)=>{
    const divElement = document.createElement('div');
    divElement.classList.add('main-todo-div');
    divElement.innerHTML = `<li>${curElem}</li>
                            <button class="deleteBtn">Delete</button>`;
    mainTodoElement.appendChild(divElement);
}

const addElement = ()=>{
    if(inputValue.value === "")
    {
        alert("You must write something");
    }
    else{
        const text = inputValue.value.trim();
        if(!localTodoLists.includes(text)){
            localTodoLists.push(text);
            localTodoLists = [...new Set(localTodoLists)];
            console.log(localTodoLists);
            localStorage.setItem("todoList", JSON.stringify(localTodoLists));
            addTodoDynamicElement(text);
        }
    }

};

document.getElementById("btn").addEventListener("click",()=>{
    addElement();
    inputValue.value = "";
})



const showTodoList = ()=>{
    console.log(localTodoLists);
    localTodoLists.forEach((curElem)=>{
        addTodoDynamicElement(curElem);
    })
}

showTodoList();

const removeTodoElem = (e)=>{
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    // console.log(todoListContent);
    let parentElem = todoToRemove.parentElement;
    localTodoLists = localTodoLists.filter((curTodo)=>{
        return curTodo !== todoListContent;
    })
    console.log(localTodoLists);

    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();
}

const checkElement = (e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
};

mainTodoElement.addEventListener("click",(e)=>{
    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
    }
    checkElement(e);
});
