/**
 * This is the entry for for the demo app, not for the plugin
 *
 * The plugin's entry is index.js
 *
 */
import Vue from 'vue'
import App from './demo/App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
