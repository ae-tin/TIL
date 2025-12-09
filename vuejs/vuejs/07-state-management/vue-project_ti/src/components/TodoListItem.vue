<template>
  <div>
    <input type="checkbox" name="todo-text" v-model="isDone">
    <label for="todo-text" :class="{'is-done':props.todo.isDone}">{{ todo.text }}</label>
    <button @click="deleteTodo(todo.id)">삭제</button>
  </div>
</template>

<script setup>
  import { useTodoStore } from '@/stores/todo';
  import { ref, watch } from 'vue';
  const props = defineProps({
    todo: Object,
  })

  const store = useTodoStore()
  const deleteTodo = function (selectedId) {
    store.deleteTodo(selectedId)
  }
  const isDone = ref(props.todo.isDone)

  watch(isDone, () => {
    store.updateTodo(props.todo.id)
  })
</script>

<style scoped>
.is-done {
  text-decoration: line-through;
}
</style>