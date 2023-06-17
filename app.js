const addTodoForm = document.querySelector('.form-add-todo')
const searchTodoForm = document.querySelector('.form-search')
const todoContainer = document.querySelector('.todos-container')

addTodoForm.addEventListener('submit',event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  if(inputValue.length < 3 || inputValue === ''){
    alert('Por favor, insira um texto válido!')
    return
  }

  todoContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
  `

  event.target.reset()
})

todoContainer.addEventListener('click', event => {
  const clickedElement = event.target
  const TrashWasClicked = Array.from(clickedElement.classList).includes('delete')

  if(TrashWasClicked){
    clickedElement.parentElement.remove()
  }

})

searchTodoForm.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase().trim()
  const todos = Array.from(todoContainer.children)

  todos.forEach(todo => {
    const shouldBeVisible = todo.textContent.toLocaleLowerCase().trim().includes(inputValue)
    
    todo.classList.add(shouldBeVisible ? 'd-flex' : 'd-none')
    todo.classList.remove(shouldBeVisible? 'd-none' : 'd-flex')
  })
})