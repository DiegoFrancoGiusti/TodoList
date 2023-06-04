const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search')

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  if(inputValue.length){
    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `
    event.target.reset()
  }
})

todosContainer.addEventListener('click',event => {
  const clickedElement = event.target
  const getDeleteIcon = Array.from(clickedElement.classList).includes('delete')

  if(getDeleteIcon){
    clickedElement.parentElement.remove()
  }
})

formSearch.addEventListener('input',event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)
  
  todos.forEach(todo => {
    if(!todo.textContent.toLowerCase().includes(inputValue)){
      todo.classList.remove('d-flex')
      todo.classList.add('hidden')
    }
    if(todo.textContent.toLowerCase().includes(inputValue)){
      todo.classList.remove('hidden')
      todo.classList.add('d-flex')
    }
  })
})