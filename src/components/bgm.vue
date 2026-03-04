<template>
    <audio
        ref = "audioPlayer"
        preload = "auto"
        loop
        :src= "audioSrc">
    </audio>
    <img class="bgm_button"
        :class="{active: isPlaying}"
        :src="LogoPlay"
        @click="audioCtrl">
    </img>
</template>


<!-------------------------------------------------------------------------------->
<!---------------分隔线-------------分隔线------------分隔线----------------------->


<script setup lang="ts" name = "bgm">

    import {ref} from 'vue';
    //所有的资源一定要import，不然不生效
    import bgm_logo from '@/item/bgm logo.png'
    import audio from '@/item/Buffer Zone.mp3'

    //logo和bgm
    const LogoPlay = ref(bgm_logo)
    const audioSrc = ref(audio)
    //bgm元素
    const audioPlayer = ref(null)

    //弄个变量记录当前播放状态
    const isPlaying = ref(false)
    //更新状态
    const Update_PlayState = () => {
        isPlaying.value = !audioPlayer.value.paused
    }

    //控制播放or暂停
    const audioCtrl = () => {
        if(isPlaying.value){
            audioPlayer.value.pause()
        } 
        else{
            audioPlayer.value.play().catch(
                error => {console.error('播放失败:', error)}
            )
        }
    }


    import {onMounted, onUnmounted} from 'vue';

    onMounted(() => {
        //添加监听事件
        audioPlayer.value.addEventListener('play', Update_PlayState)
        audioPlayer.value.addEventListener('pause', Update_PlayState)

        //页面加载后尝试自动播放音频
        if (audioPlayer.value) {
            isPlaying.value = true
            const playAudio = () => {
                audioPlayer.value.play().catch(
                    error => {console.warn('自动播放被阻止:', error)}
                )
            }
        
        //稍微延迟以确保DOM完全加载
        setTimeout(playAudio, 300)
        }
    })

    onUnmounted(() => {
        if(audioPlayer.value){
            audioPlayer.value.removeEventListener('play', Update_PlayState)
            audioPlayer.value.removeEventListener('pause', Update_PlayState)
        }
    })
</script>


<!----------------------------保护眼睛，从我做起----------------------------------->
<!-------------------------------------------------------------------------------->


<style scoped>
    .bgm_button.active{
        position: absolute;
        top: 30px;
        left: 1450px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        /* 下面这句一定要加，不然没覆盖的话一直是灰的 */
        filter: none
    }
    .bgm_button{
        position: absolute;
        top: 30px;
        left: 1450px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        /* 未激活状态下就灰 */
        filter: grayscale(100%) 
    }
</style>

<!-- 这个组件其实还有问题没解决 -->
<!-- 页面刷新后bgm就停掉了 -->
<!-- ai给的解释是可能是浏览器权限问题 -->
<!-- 后台console也提示 -->