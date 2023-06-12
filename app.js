const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search')

let liGroupItem = document.querySelectorAll('li.list-group-item')
let deleteIcons = document.querySelectorAll('.delete')

const updateNodeLists = () => {
  liGroupItem = document.querySelectorAll('li.list-group-item')
  deleteIcons = document.querySelectorAll('.delete')
}

const addTodo = event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  if(inputValue.length < 3 || inputValue === ''){
    alert('Por vavor, insira um texto valido!')
    return
  }

  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-todo-index="${liGroupItem.length}"></i>
    </li>
  `

  updateNodeLists()
  formAddTodo.reset()
}

const setElementsAttribute = (element,attribute) => {
  element.forEach((_,index) => {
    deleteIcons[index].setAttribute(attribute, `${index}`)
  })
}

const deleteTodo = event => {
  const clickedElement = event.target
  const getDeleteIcon = Array.from(clickedElement.classList).includes('delete')

  if(getDeleteIcon){
    const indexTodo = clickedElement.dataset.todoIndex

    liGroupItem[indexTodo].remove()

    updateNodeLists()
    setElementsAttribute(liGroupItem,'data-todo-index')
  }
}

const searchTodo = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  todos.forEach(todo => {
    let shouldBeVisible = todo.textContent.toLowerCase().trim().includes(inputValue)

    todo.classList.add(shouldBeVisible ? 'd-flex' : 'd-none')
    todo.classList.remove(shouldBeVisible ? 'd-none' : 'd-flex')
  })
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', deleteTodo)
formSearch.addEventListener('input',searchTodo)