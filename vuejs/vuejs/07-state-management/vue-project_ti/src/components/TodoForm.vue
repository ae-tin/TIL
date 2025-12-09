<template>
  <div>
    <form @submit.prevent="createTodo" ref="formElem">
      <input type="text" v-model="todoText">
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import { useTodoStore } from '@/stores/todo'

  const store = useTodoStore()
  const todoText = ref(null)
  const formElem = ref(null)
  const createTodo = function () {
    store.addTodo(todoText.value)
    formElem.value.reset()
  }
</script>

<style scoped>

</style>