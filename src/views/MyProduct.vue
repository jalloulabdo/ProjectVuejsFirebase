<template>
    
    <div class="container">
        <h1 style="text-align:center">My products</h1>
               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add new product
                </button>
        <div class="row">
    
                        <div class="card m-2" style="width: 18rem;" v-for="item in myproducts" :key="item.key">
                        <img :src="item.image" class="card-img-top" alt="../assets/logo.png">
                        <div class="card-body">
                            <h5 class="card-title">{{item.name}}</h5>
                            <h5 class="card-title">{{item.price}}</h5>
                            <p class="card-text">{{item.description}}</p>
                            <a href="#" class="btn btn-primary">Buy</a>
                            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#update" v-on:click="getData(item.name,item.price,item.description,item.image,item.key)">Update</button>
                            <button class="btn btn-danger" v-on:click="deleteProduct(item.key)">Delete</button>
                        </div>
                        </div>
                        
    
    
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- form start here -->
                <form @submit.prevent="addproduct">
                    <input class="form-control m-2" type="text" placeholder="name" aria-label="default input example" v-model="product.name">
                    <input class="form-control m-2" type="number" placeholder="Price" aria-label="default input example" v-model="product.price">
                    <input class="form-control m-2" type="file" placeholder="Image" accept=".jpg,.png"  @change="previewImage" aria-label="default input example">
                    <textarea class="form-control m-2" id="exampleFormControlTextarea1" rows="3" placeholder="Description" v-model="product.description"></textarea>
            
                <div class="alert alert-success" v-if="messageSuccess">{{messageSuccess}}</div>
                <progress id="js-progressbar" class="uk-progress" :value="uploadValue" max="100"></progress>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">Add</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </form>
                <!-- form end here -->
            </div>
            
            </div>
        </div>
        </div>
        
        <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- update form start here -->
        
                <form @submit.prevent="update">
                    <input class="form-control m-2" type="text" placeholder="name" aria-label="default input example" v-model="dataProduct.name">
                    <textarea class="form-control m-2" id="exampleFormControlTextarea1" rows="3" placeholder="Description" v-model="dataProduct.description" ></textarea>
                    <input class="form-control m-2" type="text" placeholder="image" aria-label="default input example"  v-model="dataProduct.image" >
                    <input class="form-control m-2" type="number" placeholder="price" aria-label="default input example" v-model="dataProduct.price">
                    <div class="alert alert-success" v-if="messageUpdate">{{messageUpdate}}</div>
                    <button class="btn btn-success" type="submit">Update now</button>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
                <!-- update form end here -->
            </div>
            
            </div>
        </div>
        </div>
    
    </div>
    </template>


<script>
import {db} from "../Firebase" 
import { doc,setDoc, getDocs ,collection,deleteDoc} from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";

export default {
    name:'MyProduct',
    data(){
        return{
            product:{
                name:'',
                price:0,
                image:'',
                description:'',
                uid:localStorage.getItem('uidUser')

            },
            dataProduct:{
            name:'',
            price:0,
            image:'',
            description:'',
            key:'',
            uid:localStorage.getItem('uidUser')
            },
            uploadValue:0,
            picture:null,
            imageData : null,
            imageName:'',
            messageSuccess:'',
            messageUpdate:'', 
            myproducts:[],
            uid:localStorage.getItem('uidUser')
        }
    },  
      created() {
          getDocs(collection(db, "products")).then((querySnapshot) => {
        this.myproducts=[]
        querySnapshot.forEach((doc) => {
            if(this.uid===doc.data().uid){
                    this.myproducts.push({
                        key:doc.id,
                        name:doc.data().name,
                        price:doc.data().price,
                        description:doc.data().description,
                        image:doc.data().image
                    })
                }
        });
             
        });
    },
    methods:{
        async  addproduct(){

        //  upload image start here
            this.picture=null;
            const storage = getStorage();
            const storageRef  = ref(storage, `images/${this.imageName}`);
            const storageReff=   uploadBytesResumable(storageRef,this.imageData);
            storageReff.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(this.uploadValue)
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                getDownloadURL(storageReff.snapshot.ref).then((downloadURL) => {
                    this.product.image=downloadURL
                        const docData={
                            name:this.product.name,
                            price:this.product.price,
                            image:this.product.image,
                            description:this.product.description,
                            uid:this.product.uid
                        };
                        
                        setDoc(doc(db, 'products', this.makeid()), docData).then(()=>{
                            this.syncro()
                            this.messageSuccess='Added'
                            this.product.name ='',
                            this.product.price =0,
                            this.product.image ='',
                            this.product.description =''
                        
                        });
                });
                });
         
    //  upload image end here
    
        
               
        },
        makeid(){
          var length=10;
          var result  = '';
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        getData(name,price,description,image,key){
        this.dataProduct.name=name
        this.dataProduct.price=price
        this.dataProduct.description=description
        this.dataProduct.image=image
        this.dataProduct.key=key
        },
        async  update(){
            const docData={
                    name:this.dataProduct.name,
                    price:this.dataProduct.price,
                    image:this.dataProduct.image,
                    description:this.dataProduct.description,
                    uid:this.dataProduct.uid
                };
                await  setDoc(doc(db, 'products', this.dataProduct.key), docData).then(()=>{
                    this.syncro()
                    this.messageUpdate='Updated'
                    this.dataProduct.name ='',
                    this.dataProduct.price =0,
                    this.dataProduct.image ='',
                    this.dataProduct.description =''
                   
                });
        },
        async deleteProduct(key){
            await deleteDoc(doc(db, "products", key)).then(()=>{
                this.syncro()
            });
           
        },
        syncro() {
          getDocs(collection(db, "products")).then((querySnapshot) => {
          this.myproducts=[]
          querySnapshot.forEach((doc) => {
            if(this.uid===doc.data().uid){
                    this.myproducts.push({
                        key:doc.id,
                        name:doc.data().name,
                        price:doc.data().price,
                        description:doc.data().description,
                        image:doc.data().image
                    })
                }
        });
             
        });
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.imageName=event.target.files[0].name
        }, 
    }
}
</script>