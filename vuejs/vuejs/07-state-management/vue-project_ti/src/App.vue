
<template>
  <div>
    <h1>Todo Project</h1>
    <h2>완료된 Todo의 개수 : {{ store.doneTodosCount }}</h2>
    <TodoList/>
    <TodoForm/>
  </div>
</template>





<script setup>
  import TodoForm from '@/components/TodoForm.vue';
  import TodoList from '@/components/TodoList.vue';
  import { useTodoStore } from '@/stores/todo';

  const store = useTodoStore()

</script>




<style scoped>
</style>
