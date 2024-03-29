import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.prod.js

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "shine306082";

createApp({
    data(){
      return{
        user:{
          username:"",
          password:""
        }
      }
    },
    methods:{
      login(){
        axios.post(`${url}/admin/signin`,this.user)
            .then((res) => {
              //將登入的行為(expired 和 token)儲存於cookie上
              const { token,expired } = res.data;
              console.log(token,expired);
				      document.cookie=`shineToken=${token}; expires=${new Date(expired)};`;
              window.location = "product.html";
            })
            .catch((err) => {
              console.dir(err);
              // alert(err.response.data.message);
            })
      }
    }
  }).mount("#app");