const form = document.querySelector('.form');
const todoInput = document.querySelector('.form__input');
const ul = document.querySelector('.todo-items');


form.addEventListener('submit', (e) => {
    
    e.preventDefault();

    addTodo();
})

ul.addEventListener('click', checkTodoItem)

const todoItemsFromLs = JSON.parse(localStorage.getItem('todoItems'));



if(todoItemsFromLs) {
    todoItemsFromLs.forEach(todo => {
        addTodo(todo)
    }) 
}


function addTodo(todo) {
    let textInput = todoInput.value;
    if(todo) {
        textInput = todo.text;

        const isChecked = todo.checked;
        let checkboxes = document.querySelectorAll('.checkbox-field');
    }

    if (textInput === '') {
        alert('Please enter todo')
    } else {
        document.querySelector('.one-color-bg__list').style.display = 'block';
        ul.innerHTML += `<li class="todo-items__item">
        <div class="field-group">
        <input onclick="updateStatus(this)"type="checkbox" name="checkbox" class="checkbox-field"/>
        </div>
        <p class="p-todo">${textInput}</p>
        <span class="delete-btn"
        ><img class="icon-cross" src="/images/icon-cross.svg" alt=""
        /></span>
    </li>`
    todoInput.value = '';
}

    updateLs();
}

function updateStatus(selectedTask) {

    let taskName = selectedTask.parentElement.parentElement.children[1];
}


function checkTodoItem(e) {
    if(e.target.classList.contains('checkbox-field')) {
        if(e.target.checked === true)
        {
            e.target.parentElement.parentElement.children[1].classList.add('complete');
            // decreaseItemLeft();
        } else {
            e.target.parentElement.parentElement.children[1].classList.remove('complete');
        }
    }
     updateLs();
}

function updateLs() {
    let lElements = document.querySelectorAll(".todo-items__item");

    let arrOfTodos = [];

    lElements.forEach(todo => {
        arrOfTodos.push({
            text: todo.children[1].innerText,
            complete: todo.children[1].classList.contains('complete')
        })
    })
    localStorage.setItem('todoItems', JSON.stringify(arrOfTodos))
}


function deleteTodoItem(item) {
    item.parentElement.remove();
}

