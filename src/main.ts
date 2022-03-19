import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

app.directive('visible', (el, binding) => {
	el.style.visibility = binding.value ? 'visible' : 'hidden';
})

app.use(createPinia())
app.use(router)

app.mount('#app')
