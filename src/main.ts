import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker' // disabled for now
import router from './router'
import store from './store'

import '@/assets/tailwind.scss'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
