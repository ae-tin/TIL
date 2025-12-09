import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  let id = 0

  const todos = ref([
    {id: id++, text: '할 일 1', isDone: false},
    {id: id++, text: '할 일 2', isDone: false},
  ])
  
  const addTodo = function (todoText) {
    todos.value.push({
      id: id++,
      text:todoText,
      isDone: false,
    })
  }

  const deleteTodo = function (selectedID){
    const index = todos.value.findIndex(todo => todo.id === selectedID)
    todos.value.splice(index, 1)
  }

  const updateTodo =function (selectedID) {
    todos.value.forEach(todo => {
      if (todo.id === selectedID){
        todo.isDone = !todo.isDone
      }
    })
  }

  const doneTodosCount = computed(() => {
    const doneTodos = todos.value.filter(todo => todo.isDone)
    return doneTodos.length
  })

  return { 
    todos, 
    addTodo,
    deleteTodo,
    updateTodo,
    doneTodosCount
  }, {persist:true}
})
