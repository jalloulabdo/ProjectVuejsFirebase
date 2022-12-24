<template>
    <div >
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="user">
                    <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                    <router-link class="nav-link" to="/products">Products</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                    <router-link class="nav-link" to="/myproduct">My Product</router-link>
                    </li>
                    <li class="nav-item" v-if="user==null">
                    <router-link class="nav-link" to="/signin">Sign In</router-link>
                    </li>
                    <li class="nav-item" v-if="user==null">
                    <router-link class="nav-link" to="/signup">Sign Up</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                        <button type="button" class="btn btn-light" v-on:click="lougout">Lougout</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
  </template>

  <script>
import {signOut} from "firebase/auth";
import {auth} from "../Firebase"
import router from "@/router";

  export default {
    name:'NavBar',
    data(){
        return{
            user:null
        }
    },
    created(){
        auth.onAuthStateChanged(user => {
              if(user){ 
                this.user=user
              }else{
                this.user=null
              }
            });
    },
    methods:{
        lougout(){
            signOut(auth).then(()=>{
                localStorage.removeItem('uidUser')
                router.push({ name: "signin" });
            })
        }
    }
  }
  </script>