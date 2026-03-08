<template>
    <div class="container">
        <div v-for="(project, key) in projects">
            <div class="block"
                :class="{active: isTouch === key}"
                @click="openURL(project.url)"
                @mouseenter="toTouch(key)"
                @mouseleave="unTouch()"
            >
                <img class="imgSet"
                    :src= "project.img"
                    
                ></img>
                <div class="titleSet">
                    {{ project.title }}
                </div>
            </div>
        </div>
    </div>
</template>


<!-------------------------------------------------------------------------------->
<!---------------分隔线-------------分隔线------------分隔线----------------------->


<script setup>

    import img1 from '@/item/frontend/personalweb.png'
    import img2 from '@/item/frontend/echo.png'

    const projects = [
        {img: img1, title: '个人页面（就是你现在看到的）', url: 'https://github.com/PhiLia93/personal-web'},
        {img: img2, title: '回声实验: vue + express前后端联动', url: 'https://github.com/PhiLia93/echo'},
    ]

    const openURL = (url) => {
        window.open(url, '_blank');
    };

    import {ref} from 'vue'
    const isTouch = ref(null)
    
    const toTouch = (index) => {
        isTouch.value = index;
    }
    const unTouch = () => {
        isTouch.value = null;
    }

</script>


<!----------------------------保护眼睛，从我做起----------------------------------->
<!-------------------------------------------------------------------------------->


<style scoped>
    .container{
        position: absolute;
        top: 130px;
        left: 220px;
        display: flex;
        gap: 20px;
    }
    .block{
        width: 300px;
        height: 250px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    .block.active{
        width: 300px;
        height: 250px;
        cursor: pointer;
        box-shadow: 0 0 20px 5px rgba(0, 212, 255, 0.7); /* 外发蓝光 */
        border-radius: 5px;
        transition: all 0.2s ease-in-out;
    }
    .imgSet{
        margin-left: 30px;
        margin-top: 10px;
        width: 240px;
        height: 180px;
        border-radius: 5px;
    }
    .titleSet{
        margin-left: 30px;
        width: 240px;
        height: 30px;
        color: aliceblue;
    }
</style>