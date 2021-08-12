<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                   @titleClick="titleClick"
                    ref="nav"/>
      <Scroll class="content"
              @scroll="detailscroll"
              ref="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="paramref" :param-info="paramInfo"/>
        <DetailCommentInfo  ref="commentref" :comment-info="commentInfo"/>
        <goods-list  ref="goodsref" :goods="recommends"/>
      </Scroll>
     <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backclick"  v-show="backshow"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import BackTop from "@/components/content/backTop/BackTop";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import { mapActions } from 'vuex'
// import BScroll from "better-scroll";

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,

  },
  data(){
    return{
      scroll:null,
      iid:null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      titleIndex:[],
      curryType:0,
      backshow:false,
    }
  },
  created() {
    this.iid=this.$route.params.iid
    //请求详情数据
    getDetail(this.iid).then( res => {
      const data=res.result
      this.topImages=data.itemInfo.topImages
      // console.log(res);
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息
      this.shop=new Shop(data.shopInfo)

      //获取商品详细信息
      this.detailInfo=data.detailInfo

      //获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

    })
    //请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
  },
  updated() {
     this.titleIndex=[]

     this.titleIndex.push(0)
    this.titleIndex.push(this.$refs.paramref.$el.offsetTop)
    this.titleIndex.push(this.$refs.commentref.$el.offsetTop)
    this.titleIndex.push(this.$refs.goodsref.$el.offsetTop)

  },
  mounted() {
    this.$bus.$on('itemImageload',()=>{
    })

  },

  methods:{
    ...mapActions(['addCart']),
    addToCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc  = this.goods.desc
      product.realPrice = this.goods.realPrice
      product.iid = this.iid

      this.addCart(product).then(res => {
        this.$toast.show(res,1500)
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
    },
    imageLoad() {
     this.$refs.scroll.refresh()
    },
    titleClick(index){
     this.$refs.scroll.scrollTo(0,(-this.titleIndex[index]),500)
    },
    //返回顶部单击事件
    backclick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    detailscroll(position){
     const detail=(-position.y + 44);
     //返回顶部是否显示
      this.backshow = (-position.y > 1500)
     const  length=this.titleIndex.length
      for (let i = 0; i<length;i++){
        if(this.curryType!== i && ((i < length - 1 && detail >= this.titleIndex[i] && detail
        < this.titleIndex[i+1]) || (i===length-1 && detail >= this.titleIndex[i]))){
          this.curryType = i
          this.$refs.nav.curryType = this.curryType
        }
      }

    }
  },
}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 10;
   background-color: #ffffff;
   height: 100vh;
 }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
 .content{
   height: calc(100vh - 44px - 49px);
 }

</style>
