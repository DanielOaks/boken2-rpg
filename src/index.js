import Vue from 'vue'
import App from './App.vue'
import store from './store'
require('@openfonts/open-sans_all')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
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
