<template>
  <div id="app">
    <p data-test="abc" data-xxx="123">
      This sinmple page is meant to demo the plugin's behaviour. Depending on which <code>serve</code> 
      command you used, the paragrpah that you are reading has a <code>data-test</code> attribute - or it doesn't
    </p>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
