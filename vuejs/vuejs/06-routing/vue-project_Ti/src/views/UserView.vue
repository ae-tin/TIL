<template>
  <div>
    <h3>User view</h3>
    <p>{{ userId }}번 유저</p>
    <router-link :to="{name:'profile'}"> Profile</router-link>
    <router-link :to="{name:'posts'}"> Posts</router-link>
  </div>
  <hr>
  <button @click="goHome">홈으로</button>
  <RouterView/>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink, RouterView, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const userId = ref(route.params.id)
const goHome = function (){
  //router.push({name: 'home'})
  router.replace({name: 'home'})
}
</script>

<style  scoped>

</style>