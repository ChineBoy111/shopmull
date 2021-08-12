<template>
 <div class="toast" v-show="isshow" >
   <div>{{message}}</div>
 </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
  },
  data(){
    return {
      message: '',
      isshow:false
    }
  },
  methods:{
    show(message,duration = 1500){
        this.isshow = true
        this.message = message

      setTimeout(()=>{
        this.isshow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
 .toast{
   position: fixed;
   z-index: 999;
   top:50%;
   left:50%;
   transform: translate(-50%,-50%);
   color: #fff;
   padding: 8px 10px;
   background:rgba(0,0,0,.8);
   border-radius: 15px;
 }
</style>
