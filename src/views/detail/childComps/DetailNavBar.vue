<template>
  <div>
    <nav-bar>
      <div slot="left" class="backleft" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             @click="titleClick(index)"
             :class="{active: index===curryType}"
             class="title-item">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      curryType:0
    }
  },
  methods:{
    titleClick(index){
      this.curryType=index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()

    }
  }
}
</script>

<style scoped>
  .title{
   display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .backleft img{
    margin-top: 10px;
    margin-left: 20px;
  }
</style>
