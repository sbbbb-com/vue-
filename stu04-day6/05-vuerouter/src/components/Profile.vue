<template>
<div>
  <h2>我是profile</h2>
  <h2>{{$route.query}}</h2>
  <ul>
    <li v-for="item in $route.query">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>
h2{
  background: #42b983;
  color: red;
}
</style>
