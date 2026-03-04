<template>
  <div class="bg_container">
    <!-- 白竖线 -->
    <div class="vertical_line"></div>
    <!-- 白横线 -->
    <div class="horizontal_line"></div>
    <!-- logo -->
    <img :src="logoSrc" alt="logo" class="logo" />
    <!-- 标题 -->
    <h1 class="title_cn">个人项目</h1>
    <h1 class="title_l">|</h1>
    <h1 class="title_en">PROJECT</h1>
    <img :src="aclogoSrc" alt="aclogo" class="aclogo" />
    <!-- 菜单logo -->
    <h1 class="logo_menu">MENU</h1>
    <!-- 背景logo -->
    <h1 class="logo1_bg">PERSONAL</h1>
    <h1 class="logo2_bg">PROJECT</h1>

    <!-- 加入荧光 -->
    <Firefly />

    <slot></slot>
  </div>
</template>


<!-------------------------------------------------------------------------------->
<!---------------分隔线-------------分隔线------------分隔线----------------------->


<script setup name = "bg">

    import Firefly from '@/components/firefly.vue'
    import logoSrc from '@/item/logo.png'
    import aclogoSrc from '@/item/ac logo.png'

</script>


<!----------------------------保护眼睛，从我做起----------------------------------->
<!-------------------------------------------------------------------------------->


<style scoped>

    /* 背景 */
    .bg_container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      /* overflow: hidden; */
      /* 让页面顶部有点点渐变白 */
      background: linear-gradient(180deg, #262626 0%, #1a1a1a 100%);
    }
    
    /* 这里title和logo还有其它元素都要加绝对位置，不然会顶到 */
    /* 注意，元素不要用百分比，不然缩放会出问题 */
    .title_cn {
      position: absolute;
      color: #ffffff;
      opacity: 0.3;     /* 透明度 */
      margin-left: 300px; /* 往右挪点 */
      margin-top: 33px;   /* 往下挪点 */
      font-size: 20px;  /* 改下字体大小 */
    }
    .title_l {
      position: absolute;
      color: #ffffff;
      opacity: 0.15;
      margin-left: 400px; 
      margin-top: 33px;
      font-size: 20px;  
    }
    .title_en {
      position: absolute;
      color: #ffffff;
      opacity: 0.3;   
      margin-left: 425px; 
      margin-top: 33px;  
      font-size: 20px; 
    }

    .logo {
      position: absolute;
      margin-left: 30px;
      margin-top: 5px;
    }

    .aclogo {
      position: absolute;
      width: 60px;
      width: 60px;
      margin-left: 240px;
      margin-top: 20px;
    }

    .logo_menu {
      position: absolute;
      color: #ffffff;
      opacity: 0.1;  
      margin-left: 55px; 
      margin-top: 110px;  
      font-size: 40px; 
    }

    .logo1_bg{
      position: absolute;
      color: #ffffff;
      opacity: 0.03;  
      margin-left: 985px; 
      margin-top: 105px;  
      font-size: 100px; 
    }
    .logo2_bg{
      position: absolute;
      color: #ffffff;
      opacity: 0.03;  
      margin-left: 1065px; 
      margin-top: 185px;  
      font-size: 100px; 
    }

    /* 竖线 */
    .vertical_line {
    position: absolute;
    top: 0;
    left: 182px;
    width: 1px;
    height: 100%;
    background-color: #ffffff;
    transform: translateX(-100%) scaleX(v-bind(0.5)); /* 这样就细一点 */
    }

    /* 横线 */
    .horizontal_line {
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ffffff;
    transform: translateY(-100%) scaleY(v-bind(0.5)); /* 同理 */
    }
</style>