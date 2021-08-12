import Toast from "./Toast";

const obj = {}

obj.install = function (Vue){
   //1.创建组件构造器
  const  toastConsrustor = Vue.extend(Toast)
  //2.new的方式,根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConsrustor()
  //3.将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
