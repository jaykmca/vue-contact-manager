<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">
                   View contact
                </p>
                <p class="fst-italic">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam voluptatum perferendis voluptates error autem, neque sunt dolores enim mollitia nisi at reprehenderit repellat vero maxime similique iste reiciendis ad. Sunt?
                </p>
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

    <div class="container" v-if="!loading && isDone">
        <div class="row align-items-center">
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img-big"/>
            </div>
            <div class="col-md-6">
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
                            <li class="list-group-item">
                                Company: <span class="fw-bold">{{contact.company}}</span>
                            </li>
                            <li class="list-group-item">
                                Title: <span class="fw-bold">{{contact.title}}</span>
                            </li>
                            <li class="list-group-item">
                                Group: <span class="fw-bold">{{group.name}}</span>
                            </li>
                   </ul>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i>Back</router-link>

            </div>

        </div>
    </div>
   
</template>

<script>
import { ContactService}  from '../../services/ContactService';
import SpinnerView from '../components/SpinnerView.vue';
export default {
    name:'ViewContact',
    components:{
        SpinnerView
    },
    data() {
        return {
               contactId : this.$route.params.contactId,
               loading : false,
               contact:{},
               erorMessage: null,
               group: {}
            
               }
    },
    created : async function(){
        try{
             this.loading =true
             let response = await ContactService.getContact(this.contactId)
             this.contact = response.data
             let groupResponse = await ContactService.getGroup(this.contact)
             this.group = groupResponse.data
             this.loading=false

        }catch(error){
            console.error(error)
            this.erorMessage = error
            this.loading = false

        }

    },
    methods:{
        isDone : function(){
            return Object.keys(this.contact).length >0 && Object.keys(this.group) >0 
        }
    }

   
}
</script>


<style scoped>

</style>
