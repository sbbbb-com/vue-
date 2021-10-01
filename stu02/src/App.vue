<template>
  <div id="app">

      {{result}}

      <h2>========================</h2>
      <HelloWorld></HelloWorld>
  </div>
</template>

<script>

import axios from "axios";
import HelloWorld from "@/components/HelloWorld";

export default {
  name: 'App',
  data(){
    return {
      result: ""
    }
  },
  created() {
    axios({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(res=>{
      //console.log(res)
      this.result=res
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
