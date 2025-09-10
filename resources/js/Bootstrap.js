import axios from 'axios';
window.axios = axios;

// Configuration CSRF pour Axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configuration du token CSRF depuis les cookies
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Configuration automatique du token XSRF pour Inertia.js
window.axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
window.axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
