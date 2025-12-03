<template>
  <div>
    GrandChild!
    * ParentChilds Message: {{ myMsg }}
    <button @click="updateName">Grand Child update name</button>
  </div>
</template>

<script setup>
  defineProps({
    myMsg: String
  })

  const emit = defineEmits(["updateName"])
  const updateName = function (event) {
    emit("updateName", event.target)
  }
</script>
  


<style scoped>

</style>