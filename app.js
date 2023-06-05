const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search')
let liGroupItem = document.querySelectorAll('li.list-group-item')
let deleteIcons = document.querySelectorAll('.delete')

const updateNodeLists = () => {
  liGroupItem = document.querySelectorAll('li.list-group-item')
  deleteIcons = document.querySelectorAll('.delete')
}

const addTodo = inputValue => {
  const isDifferentFromZero = inputValue.length

  if(isDifferentFromZero){
    todoIndex = liGroupItem.length

    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete" data-todo-index="${todoIndex}"></i>
      </li>
    `
    updateNodeLists()
    formAddTodo.reset()
  }
}

const setElementsAttribute = (element,attribute) => {
  element.forEach((_,index) => {
    deleteIcons[index].setAttribute(attribute, `${index}`)
  })
}

const deleteTodo = (getDeleteIcon,clickedElement) => {
  if(getDeleteIcon){
    const indexTodo = clickedElement.dataset.todoIndex

    liGroupItem[indexTodo].remove()

    updateNodeLists()
    setElementsAttribute(liGroupItem,'data-todo-index')
  }
}

const setClassList = (element,removeClass,addClass) => {
  element.classList.remove(removeClass)
  element.classList.add(addClass)
}

const searchTodo = (todos,inputValue) => {
  todos.forEach(todo => {
    let valueIncludedInList = todo.textContent.toLowerCase().includes(inputValue)

    !valueIncludedInList ? setClassList(todo,'d-flex','hidden') : setClassList(todo,'hidden','d-flex')
  })
}

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()
  addTodo(inputValue)
})

todosContainer.addEventListener('click',event => {
  const clickedElement = event.target
  const getDeleteIcon = Array.from(clickedElement.classList).includes('delete')

  deleteTodo(getDeleteIcon,clickedElement)
})

formSearch.addEventListener('input',event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)
   
  searchTodo(todos,inputValue)
})