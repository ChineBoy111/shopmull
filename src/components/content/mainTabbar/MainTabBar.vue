<template>
  <tabbar>
    <tabbar-item path="/home">
      <img slot="item-icon" src="@/assets/img/tabbar/home.svg">
      <img slot="item-icon2" src="@/assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/category.svg">
      <img slot="item-icon2" src="@/assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/shopcart.svg">
      <img slot="item-icon2" src="@/assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/profile.svg">
      <img slot="item-icon2" src="@/assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "../../common/Tabbar/Tabbar";
import TabbarItem from "../../common/Tabbar/TabbarItem";
export default {
  name: "MainTabBar",
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>
