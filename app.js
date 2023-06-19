const addTodoForm = document.querySelector('.form-add-todo')
const searchTodoForm = document.querySelector('.form-search')
const todoContainer = document.querySelector('.todos-container')

let todosLi = document.querySelectorAll('.list-group-item')
let trashIcons = document.querySelectorAll('i.delete')

const updateNodeList = () => {
  todosLi = document.querySelectorAll('.list-group-item')
  trashIcons = document.querySelectorAll('.list-group-item i.delete')
}

const updateDataAttribute = () => {
  todosLi.forEach((_,index) => trashIcons[index].setAttribute('data-todo-index', index))
}

const addTodo = event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  if(inputValue.length < 3 || inputValue === ''){
    alert('Por favor, insira um texto válido!')
    return
  }

  todoContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt delete" data-todo-index = "${todosLi.length}"></i>
    </li>
  `

  updateNodeList()
  event.target.reset()
}

const deleteTodo = event => {
  const clickedElement = event.target
  const TrashWasClicked = Array.from(clickedElement.classList).includes('delete')

  if(TrashWasClicked){
    const indexTodo = clickedElement.dataset.todoIndex
    
    todosLi[indexTodo].remove()

    updateNodeList()
    updateDataAttribute()
  }
}

const searchTodos = event => {
  const inputValue = event.target.value.toLowerCase().trim()
  const todos = Array.from(todoContainer.children)

  todos.forEach(todo => {
    const shouldBeVisible = todo.textContent.toLocaleLowerCase().trim().includes(inputValue)
    
    todo.classList.add(shouldBeVisible ? 'd-flex' : 'd-none')
    todo.classList.remove(shouldBeVisible? 'd-none' : 'd-flex')
  })
}

addTodoForm.addEventListener('submit', addTodo)
todoContainer.addEventListener('click', deleteTodo)
searchTodoForm.addEventListener('input', searchTodos)