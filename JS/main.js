
const switchMode = document.querySelector('.mode-icon');

switchMode.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('light');

    if(document.body.classList.contains('light')){
        switchMode.src = 'images/icon-moon.svg'
    }else{
        switchMode.src = 'images/icon-sun.svg'
    }
}

const form = document.querySelector('.form'),
todoInput = document.querySelector('.form__input'),
filters = document.querySelectorAll('.select-items');
clearCompleted = document.querySelector('.clear__completed'),
ul = document.querySelector('.todo-items');

let leftItems = document.querySelector('.num-of-items-left');


let todoItemsFromLs = JSON.parse(localStorage.getItem('todoItems'));

filters.forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector('.select-items.active').classList.remove('active');
        element.classList.add('active');
        displayTodo(element.id)
    })

});

function displayTodo(filter) {
    let liTodo = "";

    // if(todoItemsFromLs.length === 0) {
    //     document.querySelector('.list-footer').style.display = "none";
    // } else {
    //     document.querySelector('.list-footer').style.display = "flex";
    // }

    if(todoItemsFromLs) {
        todoItemsFromLs.forEach((todo, id) => {
            let isCompleted;

            if(todo.status == 'completed') {
                isCompleted = "checked"
            } else {
                isCompleted = "";
            }


            if(filter == todo.status || filter == 'all') {     
                liTodo += `<li class="todo-items__item">
                             <div class="field-group">
                             <input onclick="updateStatus(this)" id=${id} type="checkbox" name="checkbox" class="checkbox-field" ${isCompleted}/>
                             </div>
                             <p class="p-todo ${isCompleted}">${todo.name}</p>
                             <span onclick="deleteTodo(${id})" class="delete-btn"
                             ><img class="icon-cross" src="/images/icon-cross.svg" alt=""
                             /></00span>
                             </li>`;
            }
        });
    }
   
    ul.innerHTML = liTodo;
    itemsLeft();    
}

displayTodo("all");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let userTask = todoInput.value;

    if(!todoItemsFromLs) {
        todoItemsFromLs = [];
    }

    let taskInfo = { name: userTask, status: "active"};
    todoItemsFromLs.push(taskInfo);
    todoInput.value = "";
    localStorage.setItem('todoItems', JSON.stringify(todoItemsFromLs));
    displayTodo("all");
})

function updateStatus(selectedTodo) {

    let textTodo = selectedTodo.parentElement.parentElement.children[1];

    if(selectedTodo.checked) {
        textTodo.classList.add('checked');
        todoItemsFromLs[selectedTodo.id].status = 'completed';
        itemsLeft();
    } else {
        textTodo.classList.remove('checked');
        todoItemsFromLs[selectedTodo.id].status = 'active';
        itemsLeft();
    }

    localStorage.setItem('todoItems', JSON.stringify(todoItemsFromLs));
}

function deleteTodo(id) {
    console.log(id);
    todoItemsFromLs.splice(id, 1);
    localStorage.setItem('todoItems', JSON.stringify(todoItemsFromLs));

    displayTodo("all");
}

clearCompleted.addEventListener('click', () => {
    todoItemsFromLs = todoItemsFromLs.filter(e => e.status !== "completed");
    localStorage.setItem('todoItems', JSON.stringify(todoItemsFromLs));
    displayTodo("all");
})


function itemsLeft() {
    if(todoItemsFromLs) {
        leftItems.innerHTML = todoItemsFromLs.filter(e => e.status !== "completed").length;
    } 
}

