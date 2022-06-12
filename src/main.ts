import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.directive('visible', (el, binding) => {
  el.style.visibility = binding.value ? 'visible' : 'hidden'
})

app.mount('#app')
