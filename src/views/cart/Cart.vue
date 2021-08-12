<template>
  <div class="cart">
  <nav-bar class="cart-nav">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
  <cart-list/>
    <cart-bottom-bar/>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import cartList from "@/views/cart/childComps/cartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
import { mapGetters } from  'vuex'
export default {
  name: "cart",
  components:{
    NavBar,
    cartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  }
}
</script>

<style scoped>
 .cart-nav{
   background-color: var(--color-tint);
   color: #ffffff;
 }
 .cart{
   height: 100vh;
 }
</style>
