import axios from "axios";

export default axios.create({
   //baseURL: 'https://market34.up.railway.app',
   baseURL: 'https://market34-back.onrender.com',
   //baseURL: 'http://127.0.0.1:3000',
   withCredentials: true,
   xsrfHeaderName : "X-CSRFToken",
   xsrfCookieName : 'csrftoken',
});