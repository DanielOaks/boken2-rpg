import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
require('@openfonts/open-sans_all')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
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
