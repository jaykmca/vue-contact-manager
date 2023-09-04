<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">
                   Edit contact
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
            <form @submit.prevent="updateEmployee()">
                <div class="mb-2">
                     <input type="text" v-model="contact.name" class="form-control" placeholder="Name"/> 

                </div>
                 <div class="mb-2">
                     <input type="text" v-model="contact.photo" class="form-control" placeholder="Photo URL"/> 

                </div>
                 <div class="mb-2">
                     <input type="email" v-model="contact.email" class="form-control" placeholder="Email"/> 

                </div>
                 <div class="mb-2">
                     <input type="number" v-model="contact.mobile" class="form-control" placeholder="Mobile"/> 

                </div>
                 <div class="mb-2">
                     <input type="text" v-model="contact.company" class="form-control" placeholder="Company"/> 

                </div>
                <div class="mb-2">
                     <input type="text" v-model="contact.title" class="form-control" placeholder="Title"/> 

                </div>
                 <div class="mb-2">
                     <select v-model="contact.groupid" class="form-control" v-if="groups.length > 0" >
                        <option value="">Select Group</option>
                        <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
                     </select>
                </div>
                <div class="mb-2">
                     <input type="submit" class="btn btn-success" value="Update"/> 

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

import { ContactService}  from '../../services/ContactService';
export default 
{
  name: 'EditContact',
  data() {
        return {
               contactId : this.$route.params.contactId,
               loading : false,
                contact : {
                name : '',
                photo : '',
                mobile : '',
                company : '',
                title: '',
                email: '',
                groupid : '',
            },
               erorMessage: null,
               groups: []
            
               }
    },
    created : async function(){
        try{
             this.loading =true
             let response = await ContactService.getContact(this.contactId)
             this.contact = response.data
             let groupResponse = await ContactService.getAllGroups()
             this.groups = groupResponse.data
             this.loading = false

        }catch(error){
            console.error(error)
            this.erorMessage = error
            this.loading = false

        }

    },
     methods:{
        isDone : function(){
            return Object.keys(this.contact).length >0 && Object.keys(this.group) >0 
        },
        updateEmployee: async function(){
             try{
               let response = await ContactService.updateContact(this.contact, this.contactId)
               if (response){
                  return this.$router.push('/')
               }else
               {
                    return this.$router.push(`/contacts/edit/${this.contactId}`)
               }
            }catch(error){
                console.log(error)
            }
        }
    },
    
    
}
</script>


<style scoped>

</style>
