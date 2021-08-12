<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" >
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index"

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      swiperemit:false
    }
  },
  methods:{
    // detailimgLoad(){
    //   if(!this.swiperemit){
    //     this.$emit("detailimgLoad")
    //     this.swiperemit=true
    //   }

    }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
/*.detail-swiper img{*/
/*  width: 100%;*/
/*}*/
</style>
