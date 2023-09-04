<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">
                   Add contact
                </p>
                <p class="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quam maxime, dolorem, eligendi eius ipsum sequi vel maiores reiciendis deserunt ducimus nam ipsam alias fugit? Blanditiis aliquid maxime est odio!
                </p>
            </div>

        </div>
    </div>
  
    <div class="container mt-3">
       <div class="row"> 
        <div class="col-md-4">
            <form @submit.prevent="CreateEmployee()">
                <div class="mb-2">
                     <input  required type="text" class="form-control" placeholder="Name" v-model="contact.name"/> 

                </div>
                 <div class="mb-2">
                     <input  required type="text" class="form-control" placeholder="Photo URL" v-model="contact.photo"/> 

                </div>
                 <div class="mb-2">
                     <input required type="email" class="form-control" placeholder="Email" v-model="contact.email"/> 

                </div>
                 <div class="mb-2">
                     <input  required type="number" class="form-control" placeholder="Mobile" v-model="contact.mobile" /> 

                </div>
                 <div class="mb-2">
                     <input  required type="text" class="form-control" placeholder="Company" v-model="contact.company"/> 

                </div>
                <div class="mb-2">
                     <input  required type="text" class="form-control" placeholder="Title" v-model="contact.title"/> 

                </div>
                 <div class="mb-2">
                     <select class="from-control" v-if="groups.length > 0" v-model="contact.groupid">
                        <option value="">Select Group</option>
                        <option :value=group.id v-for="group of groups" :key="group.id">{{group.name}}</option>
                     </select>
                </div>
                <div class="mb-2">
                     <input type="submit" class="btn btn-success" value="Create"/> 

                </div>
            </form>
        </div>
        <div class="col-md-4">
           <img :src="contact.photo" alt="" class="contact-img" /> 
        </div>
       </div>
    </div>
</template>

<script>
import { ContactService } from '../../services/ContactService'

export default {
    name:'AddContact',
    data: function(){
        return {
            contact : {
                name : '',
                photo : '',
                mobile : '',
                company : '',
                title: '',
                email: '',
                groupid : '',
            },
            groups: []
        }
    },
    created : async function() {
        try{
          let response = await ContactService.getAllGroups()
          this.groups = response.data
        }catch(error){
           console.log(error)
        }
    },
    methods:{
        CreateEmployee: async function(){
            try{
               let response = await ContactService.createContact(this.contact)
               if (response){
                  return this.$router.push('/')
               }else
               {
                    return this.$router.push('/contacts/add')
               }
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>


<style scoped>

</style>
