<template>
    <div class="container">
        <br>
        <br>
        <form @submit.prevent="registerUser">
        <div class="mb-3" >
            <label for="exampleInputName1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleInputName1"  name="name" v-model="user.name">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1"  v-model="user.email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
        </div> 
        <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</template>


<script>
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth,db} from "../Firebase"
import router from "@/router";
import { doc,setDoc} from "firebase/firestore"; 

export default {
    name:'SignUp',
    data(){
        return{
            user:{
                name:'',
                email:'',
                password:'',
                userid:''
            },
              
        }
    },
    methods:{
        registerUser(){
            
            createUserWithEmailAndPassword(auth,this.user.email, this.user.password).then((datauser)=>{
                const docData={
                    name:this.user.name,
                    email:this.user.email,
                    userid:datauser.user.uid
                };
                
                setDoc(doc(db, 'user', this.user.name), docData);
                router.push({ name: "home" });
            })
        }
    }
}
</script>