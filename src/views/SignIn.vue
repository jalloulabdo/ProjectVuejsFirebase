<template>
    <div class="container">
        <br>
        <br>
        <form @submit.prevent="loginUser"> 
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="user.email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
        </div> 
        <div class="alert alert-danger" v-if="messageError">{{ messageError }}</div>
        
        <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>


<script>
import {
    signInWithEmailAndPassword
  } from "firebase/auth";
  import {
    auth
  } from "../Firebase"
import router from "@/router";

export default {
    name:'SignIn',
    data(){
        return {
            user:{
                email:'',
                password:''
            },
            messageError:''
        }
    },
    methods:{
        loginUser(){ 
            signInWithEmailAndPassword(auth,this.user.email, this.user.password).then((datauser)=>{
                localStorage.setItem('uidUser',datauser.user.uid)
                router.push({ name: "home" });
            }).catch(()=>{
                this.messageError='Invalider email and password'
            })
        }
    }
}
</script>