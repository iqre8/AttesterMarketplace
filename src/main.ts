import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import router from './router';
import 'primevue/resources/themes/lara-dark-indigo/theme.css';
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons'
import "primeflex/primeflex.css";
import VueCookies from 'vue-cookies'
const app = createApp(App);
app.config.globalProperties.window = window
app.component('Button', Button);
app.component('Divider', Divider);
app.component('Toast', Toast);
app.use(PrimeVue, {ripple: true});
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(router);
app.use(VueCookies, {
  expires: '1d',
  path: '/',
  domain: '',
  secure: process.env.NODE_ENV != 'development',
  sameSite: 'strict'
})


app.mount('#app')
