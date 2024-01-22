import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.scss'
import '@/styles/common.scss'
import 'virtual:svg-icons-register'
import globalComponents from "@/components/globalComponents.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from "@/locale/index.js";
import router from './router/index.js'
import pinia from './stores/index.js'
import './styles/theme/theme.scss'
// import { createPinia } from 'pinia';

// const pinia = createPinia();
console.log(import.meta.env)
const app = createApp(App)

app.use(globalComponents)
app.use(ElementPlus);
app.use(pinia);
app.use(i18n);
app.use(router);

app.config.devtools = true

app.mount('#app')
