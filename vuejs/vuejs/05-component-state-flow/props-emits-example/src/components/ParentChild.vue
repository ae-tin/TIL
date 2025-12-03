<template>
  <div>
    ParentChild
    Parents Message: {{ myMsg }}
    <parent-grand-child 
      :my-msg="myMsg"
      @update-name="updateName"/>
    <button @click="buttonClick">Script Emit!</button>
    <button @click="sendData">sendData!</button>
  </div>
</template>

<script setup>
  import ParentGrandChild from '@/components/ParentGrandChild.vue';
  defineProps({
    myMsg: String
  })
  const emit = defineEmits(["someEvent","emitArgs","updateName"])

  const buttonClick = function () {
    emit('someEvent')
  }

  const sendData = function (){
    emit("emitArgs", 1,2,3)
  }

  const updateName = function (eventTarget){
    emit("updateName", eventTarget)
  }
</script>

<style scoped>

</style>