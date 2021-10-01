<template>
<h2>{{result}}</h2>
</template>

<script>
import axios from "axios";

export default {
name: "HelloWorld",
  data(){
  return {
    result: ""
  }},
  created(){
    axios("https://api-hmugo-web.itheima.net/api/public/v1/home/catitems")
        .then(res=>{
          this.result=res
        })
    }

}
</script>

<style scoped>

</style>