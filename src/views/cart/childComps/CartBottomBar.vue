<template>
 <div class="bottom-bar">
  <div class="check-content">
    <check-button  :is-checked="selectAll"
                   class="check-button"
                    @click.native="clickButton"/>
    <span>全选</span>
  </div>
   <div class="price">
     合计:{{totalPrice}}
   </div>
   <div class="goshop" @click="clickgoshop">
     去计算:({{shoplength}})
   </div>
 </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return '￥'+this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.realPrice * item.count
      },0)
    },
    shoplength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    selectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    clickButton(){
      if(this.selectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    clickgoshop(){
      if(!this.selectAll){
        this.$toast.show('请选择购买的商品',1500)
      }
    }
  }
}
</script>

<style scoped>
 .bottom-bar{
   display: flex;
   height: 40px;
  background-color: #eee;
   position: relative;
   line-height: 40px;
   font-size: 14px;

 }
 .check-content{
   display: flex;
   align-items: center;
   margin-left: 10px;
   width: 60px;
 }
 .check-button{
   width: 20px;
   height: 20px;
   line-height: 20px;
   margin-right: 5px;
 }
 .price{
   margin-left: 30px;
   flex: 1;
 }
 .goshop{
   width: 90px;
   background-color: #f13e31;
   color: #fff;
   text-align: center;
 }
</style>
