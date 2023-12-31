import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./style.css"
/* fontawesome Icone*/

import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

/*
  Bootstap css ,js
  
*/
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import "./style.css"


createApp(App).use(store).use(router).mount('#app')
