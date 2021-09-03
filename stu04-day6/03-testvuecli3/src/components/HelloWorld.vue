<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h3>已安装的CLI插件</h3>
    <ul>
      <li>
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
           target="_blank" rel="noopener">babel</a></li>
    </ul>
    <h3>你好啊</h3>
    <ul>
      <h1>手机不能装</h1>

    </ul>
    <h3>废柴界面好麻烦</h3>
    <h3></h3>
    <ul>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
  background: url("https://picsum.photos/seed/picsum");
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
