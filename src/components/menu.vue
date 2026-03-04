<template>
    <!-- 菜单列表 -->
    <div class="menu-list">
        <div v-for="(title, key) in menuItems"
            class="button_container"
            :class="{active: isActive === key || isTouch === key}"
            @click="toClick(key)"
            @mouseenter="toTouch(key)"
            @mouseleave="unTouch()"
        >
        <div class="content"
            :class="{active: isActive === key || isTouch === key}">
            {{ title.cn }} <br>
            {{ title.en }}
        </div>
        </div>
    </div>
</template>


<!-------------------------------------------------------------------------------->
<!---------------分隔线-------------分隔线------------分隔线----------------------->


<script setup lang="ts" name = "menu">

    //菜单列表
    const menuItems = [
        {cn: '前端', en: 'FRONTEND', route: '/frontend'},
        {cn: '引擎', en: 'UNITY/UE', route: '/engine'},
        {cn: '硬件', en: 'HARDWARE', route: '/hardware'}
    ]

    import {ref} from 'vue'
    const isTouch = ref(null)
    const isActive = ref(null)

    import {useRouter} from 'vue-router'
    const router = useRouter()

    //点击事件
    function toClick(index){
        isActive.value = index
        router.push(menuItems[index].route)   //页面跳转
    }

    //鼠标放上去事件
    function toTouch(index){
        isTouch.value = index
    }

    //鼠标移开事件
    function unTouch(){
        isTouch.value = null
    }


</script>


<!----------------------------保护眼睛，从我做起----------------------------------->
<!-------------------------------------------------------------------------------->


<style scoped>

    .menu-list{
        position: absolute;
        top: 160px;
        left: 29px;
        display: flex;
        flex-direction: column;  /* 垂直排列 */
        gap: 0px;                /* 间距 */
    }

    /* 上面写好了位置，下面就不要写位置了 */

    /* 框框的未激活与激活样式 */
    .button_container{
      width: 150px;
      height: 65px;
      background: transparent;
      border-right: 3px solid rgb(150, 150, 150);
      /* 给个0.2s的渐变效果 */
      transition: all 0.2s ease-in-out;
    }
    .button_container.active{
      width: 150px;
      height: 65px;
      background: linear-gradient(
        90deg,
      rgba(0, 212, 255, 0) 0%,
      rgba(0, 212, 255, 0.08) 20%,
      rgba(0, 212, 255, 0.16) 50%,  /* 50%的位置0.16透明，上下同理 */
      rgba(0, 180, 220, 0.32) 80%,
      rgba(0, 160, 200, 0.4) 100% 
      );
      border-right: 3px solid rgb(0, 212, 255);
      transition: all 0.2s ease-in-out;
    }

    /* 字体的未激活与激活样式 */
    .content{
        color: #ffffff;
        opacity: 0.9; 
        margin-left: 20px;
        margin-top: 10px;
        transition: all 0.2s ease-in-out;
    }
    .content.active{
        color: #28cbf8;
        margin-left: 0;
        transition: all 0.2s ease-in-out;
    }

</style>