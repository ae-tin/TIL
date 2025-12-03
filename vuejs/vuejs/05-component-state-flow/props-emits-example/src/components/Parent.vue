<template>
  <div>
    Parents name {{ name }}
    <parent-child 
      @some-event="someCallback"
      my-msg="just message"
      @emit-args="getNumbers"
      @update-name ="updateName"/>
    <parent-item 
      v-for="item in items"
      :key="item.id"
      :my-prop="item"/>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import ParentChild from '@/components/ParentChild.vue';
import ParentItem  from '@/components/ParentItem.vue';

const items = ref([
  {id:1, name:'사과'},
  {id:2, name:'바나나'},
  {id:3, name:'딸기'},
])

const someCallback  =function () {
  console.log('ParentChild가 발신한 이벤트 수신 완')
}
const getNumbers  =function (...numbers) {
  console.log('ParentChild가 발신한 데이터 수신 완', numbers)
}
const updateName = function(eventTarget){
  name.value = 'Bella'
  console.log(eventTarget)
}
const name = ref("Alice")
</script>

<style scoped>

</style>