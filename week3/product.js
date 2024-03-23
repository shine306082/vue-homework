import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "shine306082";

//model
let productModal = "";
let delProductModal = "";

createApp({
	data(){
        return{
            productData:[],
            isAdd:true,
            modelItem:{
                id:"",
                title:"",
                category:"",
                origin_price:"",
                price:"",
                unit:"",
                description:"",
                content:"",
                is_enabled:"",
                imageUrl:"",
                imagesUrl:[]
            }
        }
    },
	methods:{
        checkLogin(){
            axios.post(`${url}/api/user/check`)
            .then((res) => {
                this.getData();
            })
            .catch((err) => {
                alert(err.data.message)
                window.location = "login.html";
            })
        },
        getData(){
            axios.get(`${url}/api/${path}/admin/products`)
            .then((res) => {
                this.productData = res.data.products;
            })
            .catch((err) => {
            })
        },
        openModel(btn,item){
            if(btn === 'new'){
                this.isAdd = true;
                this.modelItem = {
                    imagesUrl:[]
                };
                productModal.show()
            }else if(btn === 'edit'){
                this.isAdd = false;
                this.modelItem = {...item };
                productModal.show()
            }else if(btn === 'del'){
                this.modelItem = {...item };
                delProductModal.show()
            }
        },
        sureProducts(){
            if(this.isAdd === true){
                axios.post(`${url}/api/${path}/admin/product`,{data:this.modelItem})
                .then((res) => {
                    productModal.hide()
                    this.getData();
                })
                .catch((err) =>{
                })
            }else if(this.isAdd === false){
                const id = this.modelItem.id;
                axios.put(`${url}/api/${path}/admin/product/${id}`,{data:this.modelItem})
                .then((res) =>{
                    productModal.hide()
                    this.getData();
                })
            }         
        },
        delProduct(){
            axios.delete(`${url}/api/${path}/admin/product/${this.modelItem.id}`)
            .then((res) =>{
                delProductModal.hide()
                this.getData();
            })
        },
        addImg(){
            this.modelItem.imagesUrl.push(this.modelItem.imageUrl);
        }
    }, 
	mounted(){
        //利用replace在cookie中取出token的字串
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)shineToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");

        //預設之後每次發出請求時，會自動在headers加入token驗證
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();

        //將model的內容啟用為互動視窗
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });

        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
    }
}).mount('#app');