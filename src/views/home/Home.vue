<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control class="tab-con1"
               ref="tabControl1"
               :titles="['流行','新款','精选']"
               @tabClick="tabClick" v-show="tabcontrolShow"/>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentscroll"
          :pull-up-load="true" @pullingUp="contentpullingUp">
  <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
  <recommend-view :recommends="recommends"/>
  <feature-view/>
  <tab-control class="tab-con"
               ref="tabControl2"
               :titles="['流行','新款','精选']" @tabClick="tabClick"/>
   <goods-list :goods="showGoods"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isshowbacktop"/>
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
      curryType:'pop',
      isshowbacktop:false,
      tabcontrolShow:false,
      taboffsetTop:0,
      itemImgListener:null
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
  mounted() {
    //1.图片加载完成的事件监听
    this.itemImgListener = ()=>{
      this.$refs.scroll && this.$refs.scroll.refresh()
    }
    this.$bus.$on('homeitemImageload',this.itemImgListener)

  },
  methods:{
    getHomeMultidata() {
      getHomeMultidata().then(res => {

        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1

        this.$refs.scroll.finishPullUp()
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentscroll(position){
      this.isshowbacktop=(-position.y)>1000

      //tabcontorl吸顶效果
      this.tabcontrolShow=(-position.y)>this.taboffsetTop
    },
    contentpullingUp(){

      this.getHomeGoods(this.curryType)
      this.$refs.scroll.refresh()
    },
    swiperImgLoad() {
      //2.获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
     this.taboffsetTop=this.$refs.tabControl2.$el.offsetTop
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
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    }
    }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
 .home-nav{
   background-color: var(--color-tint);
   color: #ffffff;
   /*position: fixed;*/
   /*left: 0;*/
   /*top: 0;*/
   /*right: 0;*/
   /*z-index: 9;*/
 }
 .tab-con{
   position: sticky;
   top:44px;
   z-index: 9;
 }
 .tab-con1{
   position: relative;
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
