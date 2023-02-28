const form = document.querySelector('.form');
const todoInput = document.querySelector('.form__input');
const oneColorBg = document.querySelector('.one-color-bgd');
const list = document.querySelector('.todo-items');
const itemsLeft = document.querySelector('.num-of-items-left');

const all = document.querySelector('.select__all');
const active = document.querySelector('.select__active');
const completed = document.querySelector('.select__completed');
const clear = document.querySelector('.clear__completed');

const todoItems = document.querySelectorAll('.todo-items__item');
const todoItemsArr = [...todoItems];


form.addEventListener('submit', function (e) {
    e.preventDefault();

    addTodo();

    todoInput.value = '';
});

// let todoItemsLS = JSON.parse(localStorage.getItem('todoItems'));


// todoItemsLS.forEach(element => {
//     document.querySelector('.one-color-bg__list').style.display = 'block';
//     list.innerHTML += `<li class="todo-items__item">
//     <div class="field-group">
//     <input type="checkbox" name="checkbox" class="checkbox-field" />
//     </div>
//     <p>${element}</p>
//     <span class="close-btn"
//     ><img class="icon-cross" src="/images/icon-cross.svg" alt=""
//     /></span>
// </li>`
// })

document.addEventListener('DOMContentLoaded', getTodoItems);
list.addEventListener('click', removeTodo);
list.addEventListener('click', checkTodoItem);
completed.addEventListener('click', displayCompleted);
clear.addEventListener('click', clearCompleted);
active.addEventListener('click', clearCompleted);

function increaseItemLeft() {
    let numOfItemLeft = parseInt(itemsLeft.innerHTML);
    numOfItemLeft++;
    itemsLeft.innerHTML = numOfItemLeft;
}
 
function decreaseItemLeft() {
    let numOfItemLeft = parseInt(itemsLeft.innerHTML);
    numOfItemLeft--;
    itemsLeft.innerHTML = numOfItemLeft;
}


function addTodo() {
    let todoItemValue = todoInput.value;

    if (todoItemValue === '') {
        alert('Please enter todo')
    } else {
        document.querySelector('.one-color-bg__list').style.display = 'block';
        list.innerHTML += `<li class="todo-items__item">
        <div class="field-group">
        <input type="checkbox" name="checkbox" class="checkbox-field" />
        </div>
        <p>${todoItemValue}</p>
        <span class="close-btn"
        ><img class="icon-cross" src="/images/icon-cross.svg" alt=""
        /></span>
    </li>`
    
    saveInLS(todoItemValue);
}
increaseItemLeft();
}


function removeTodo(e) {
    if(e.target.classList.contains('icon-cross')) {
        decreaseItemLeft();
        console.log(e.target.parentElement.parentElement.remove());
    }

    removeFromLS(e.target.parentElement.parentElement);
}

    


function checkTodoItem(e) {
    if(e.target.classList.contains('checkbox-field')) {
        if(e.target.checked === true)
        {
            e.target.parentElement.parentElement.children[1].classList.add('complete');
            decreaseItemLeft();
        } else {
            e.target.parentElement.parentElement.children[1].classList.remove('complete');
        }
    }
}

function getTodoItems() {
    const todoItems = document.querySelectorAll('.todo-items__item');
    const todoItemsArr = [...todoItems];
    return todoItemsArr;
}




function displayItemLeft() {

}



function clearCompleted() {
    const clearCompletedArr = getTodoItems();
    clearCompletedArr.forEach(item => {
        if(item.children[1].classList.contains('complete')) {
            item.style.display = 'none';
        }
    })
}

function displayCompleted() {
    const displayCompletedArr = getTodoItems();
    displayCompletedArr.forEach(item => {
        if(!(item.children[1].classList.contains('complete'))) {
            item.style.display = 'none';
        }
    })
}

function saveInLS(todo) {
    let todoItems;

    if(localStorage.getItem("todoItems") === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(localStorage.getItem('todoItems'));
    }

    todoItems.push(todo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}


function getTodoItems() {
    let todoItems;

    if(localStorage.getItem("todoItems") === null) {
        todoItems = []
    } else {
        todoItems = JSON.parse(localStorage.getItem("todoItems"))
    }

    todoItems.forEach(function(item) {
        document.querySelector('.one-color-bg__list').style.display = 'block';
        list.innerHTML += `<li class="todo-items__item">
        <div class="field-group">
        <input type="checkbox" name="checkbox" class="checkbox-field" />
        </div>
        <p>${item}</p>
        <span class="close-btn"
        ><img class="icon-cross" src="/images/icon-cross.svg" alt=""
        /></span>
    </li>`
    })
}

function removeFromLS(todo) {
    let todoItems;

    if(localStorage.getItem("todoItems") === null) {
        todoItems = []
    } else {
        todoItems = JSON.parse(localStorage.getItem("todoItems"))
    }

    const todoIndex = todo.children[1].innerText;
    todoItems.splice(todoItems.indexOf(todoIndex), 1);

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}



