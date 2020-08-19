import Vue from 'vue'
import App from './App.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app ref="app" />',
  components: {
    App,
  },
  data: {
  },
  mounted: function() {
    const app = this.$refs.app;
  
    app.$refs.game.show()
  },
});
