<template>
  
  <!-- <SpinnerView/> -->
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
//import SpinnerView from './components/SpinnerView.vue'


export default {
  name:'App',
  components:{
     NavBar,
     
  }
}
</script>

