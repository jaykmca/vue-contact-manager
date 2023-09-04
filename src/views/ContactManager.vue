<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Contact Manager
                   <router-link to="/contacts/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i>New</router-link>
                </p>
                <p class="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis a, ab obcaecati maiores unde eaque illo repellendus alias dolor optio dolorem, corrupti neque veniam magni? Placeat dolore nulla incidunt temporibus.
                </p>
                <form>
                    <div class="row">
                     <div class=col-md-6>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" v-model="searchKeyword"  placeholder="Search Name"/>
                            </div>
                            <div class="col">
                                <!-- <input type="button" class="btn btn-success" v-on:click="searchContact" >Search</input> -->
                                <button type="button" class="btn btn-success" v-on:click="searchContact">Search</button>

                            </div>
                        </div>
                     </div>
                    </div>

                </form>

            </div>
        </div>
    </div>
    <!-- Spinner -->
    <div v-if="loading">
        <div class="container">
           <div class="row">
             <div class="col">
                 <SpinnerView/>
             </div>
           </div>
        </div>
    </div>

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
        <div class="container mt-3">
           <div class="row">
             <div class="col">
                <p class="h4 text-danger tw-bold">{{errorMessage}}</p>
             </div>
           </div>
        </div>
    </div>

    <div class="container mt-3" v-if="contacts.length>0" >
        <div class="row">
            <div class="col-md-6" v-for="contact of contacts" :key="contact">
               <div class="card my-2 list-group-items-success shadow-lg" >
                 <div class="card-body">
                   <div class="row align-items-center">
                     <div class="col-sm-4">
                        <img :src="contact.photo" alt="" class="contact-img"/>
                     </div>
                     <div class="col-sm-7">
                        <ul class="list-group">
                            <li class="list-group-item">
                                Name: <span class="fw-bold">{{contact.name}}</span>
                            </li>
                            <li class="list-group-item">
                                Emial: <span class="fw-bold">{{contact.email}}</span>
                            </li>
                            <li class="list-group-item">
                                Mobile: <span class="fw-bold">{{contact.mobile}}</span>
                            </li>
                        </ul>
                     </div>
                     <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                        <router-link
                            :to="`/contacts/view/${contact.id}`" class="btn btn-warning my-1">
                            <i class="fa fa-eye"></i>
                        </router-link>
                         <router-link
                            :to="`/contacts/edit/${contact.id}`" class="btn btn-primary my-1">
                            <i class="fa fa-pen"></i>
                        </router-link>
                        <button class="btn btn-danger my-1" @click="deleteContact(contact.id)">
                           <i class="fa fa-trash"></i>
                        </button>

                     </div>

                   </div>
                 </div>

               </div>
            </div>

        </div>

    </div>
</template>

<script>

import { ContactService}  from '../../services/ContactService';
import SpinnerView from '../components/SpinnerView.vue'

export default {
   name: 'contactManager',
   components:{
      SpinnerView
   },
   data: function() {
      return {
        loading:false,
        contacts: [],
        errorMessage: null,
        searchKeyword : null
      }
   },
   created: async function() {
    try{
        this.loading =true
        let result = await this.getAllContacts();
        this.contacts = result.data;
        this.loading = false


    }catch(error){
       this.errorMessage = error
       this.loading = false
    }

   },
   methods : {
     getAllContacts : async function () {
       return await ContactService.getAllContact()
    },
    
    deleteContact : async function(contactId) {
        try{
            this.loading =true
            let response = await ContactService.deleteContact(contactId)
            if (response)
            {
              let result = await this.getAllContacts();
              this.contacts = result.data;
              this.loading = false 
            }
           
        }catch(error){
            console.log(error)
        }
    },

    searchContact : async function() {
        try{
            this.loading =true
            let searchResponse = await ContactService.getSearchContact(this.searchKeyword)
            this.contacts = searchResponse.data
            this.loading =false;

        }catch(error){
            console.log(error)
        }
     }
   }
}
</script>


<style scoped>

</style>
