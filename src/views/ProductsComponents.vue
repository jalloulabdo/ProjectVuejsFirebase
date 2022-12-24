<template>
    <div class="container">
        <br>
        <br>
        <div class="row justify-content-center">
            <div class="card m-3" style="width: 18rem;" v-for="item in products" :key="item.name">
            <img :src="item.image" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <h4 class="card-title">{{ item.price }} DH</h4>
                <p class="card-text">{{ item.description }}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
           
        </div>
    </div>
</template>

<script>
 import {db} from "../Firebase"
 import { collection,getDocs} from "firebase/firestore"; 

 
    export default {
    name:'MyProduct',
    data(){
        return{
            products:[],

        }
    },
    async created() {
        const querySnapshot = await getDocs(collection(db, "products"));
            this.products=[]
            querySnapshot.forEach((doc) => {
                this.products.push({
                    key:doc.id,
                    name:doc.data().name,
                    price:doc.data().price,
                    description:doc.data().description,
                    image:doc.data().image
                })
                
            });
        },
    }
</script>