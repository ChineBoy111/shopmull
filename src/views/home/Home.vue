<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

  <scroll class="content" ref="scroll">
  <home-swiper :banners="banners"/>
  <recommend-view :recommends="recommends"/>
  <feature-view/>
  <tab-control class="tab-con"
               :titles="['流行','新款','精选']" @tabClick="tabClick"/>
   <goods-list :goods="showGoods"/>
  </scroll>
  <back-top @click.native="backClick"/>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";


import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";


import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop': {page:0,list: []},
        'new': {page:0,list: []},
        'sell': {page:0,list: []},
      },
      curryType:'pop'
    }
  },
  computed:{
    showGoods(){
     return  this.goods[this.curryType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    ////
    tabClick(index){
      switch (index){
        case 0:
          this.curryType='pop'
          break
        case 1:
          this.curryType='new'
          break
        case 2:
          this.curryType='sell'
          break
      }
    }
    }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
 .home-nav{
   background-color: var(--color-tint);
   color: #ffffff;
   position: fixed;
   left: 0;
   top: 0;
   right: 0;
   z-index: 9;
 }
 .tab-con{
   position: sticky;
   top:44px;
   z-index: 9;
 }
 .content{
   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
</style>
