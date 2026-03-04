<!-- Firefly.vue -->
<template>
  <div class="fireflies-container">
    <div
      v-for="firefly in fireflies"
      :key="firefly.id"
      class="firefly"
      :style="getFireflyStyle(firefly)"
    />
  </div>
</template>

<script setup name = "firefly">
import { ref, onMounted, onUnmounted } from 'vue'

// ========== 配置区（在此调整所有参数）==========

// 数量控制
const MAX_FIREFLIES = 15        // 同时存在的最大萤火虫数量
const SPAWN_INTERVAL = 800      // 生成间隔（毫秒）

// 生命周期
const MIN_DURATION = 4000       // 最短存活时间（毫秒）
const MAX_DURATION = 8000       // 最长存活时间（毫秒）

// 外观
const MIN_SIZE = 3              // 最小尺寸（像素）
const MAX_SIZE = 7              // 最大尺寸（像素）

// 运动
const START_Y_MIN = 80          // 起始Y位置最小值（vh，80表示屏幕底部往上80%）
const START_Y_MAX = 100         // 起始Y位置最大值（vh，100表示屏幕底部）
const FLOAT_DISTANCE_MIN = 60   // 向上飘动最小距离（vh）
const FLOAT_DISTANCE_MAX = 90   // 向上飘动最大距离（vh）

// 透明度
const MIN_OPACITY = 0.4         // 最小不透明度（0-1）
const MAX_OPACITY = 0.9         // 最大不透明度（0-1）
const FADE_IN_DURATION = 0.1    // 淡入时间占比（0-1，0.1表示前10%时间淡入）
const FADE_OUT_START = 0.9      // 开始淡出时间占比（0-1，0.9表示最后10%淡出）

// 延迟
const MAX_DELAY = 500           // 最大生成延迟（毫秒）

// ========== 状态管理 ==========

// 存储所有萤火虫对象
const fireflies = ref([])

// 唯一ID计数器
let fireflyId = 0

// 定时器引用
let spawnTimer = null

// ========== 工具函数 ==========

/**
 * 生成指定范围内的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机数
 */
const random = (min, max) => Math.random() * (max - min) + min

// ========== 核心逻辑 ==========

/**
 * 创建一个新的萤火虫
 * 每个萤火虫独立计算所有属性，垂直向上飘动
 */
const createFirefly = () => {
  const id = fireflyId++
  
  // 计算基本属性
  const startX = random(0, 100)           // 水平位置：0-100vw 随机
  const startY = random(START_Y_MIN, START_Y_MAX)  // 垂直起始位置
  const size = random(MIN_SIZE, MAX_SIZE) // 光点大小
  const duration = random(MIN_DURATION, MAX_DURATION)  // 存活时长
  const opacity = random(MIN_OPACITY, MAX_OPACITY)     // 亮度
  const delay = random(0, MAX_DELAY)      // 生成延迟
  const floatDistance = random(FLOAT_DISTANCE_MIN, FLOAT_DISTANCE_MAX)  // 上漂距离
  
  const firefly = {
    id,
    startX,
    startY,
    size,
    duration,
    opacity,
    delay,
    floatDistance
  }
  
  // 添加到活动列表
  fireflies.value.push(firefly)
  
  // 设置自动销毁定时器
  setTimeout(() => {
    removeFirefly(id)
  }, duration + delay)
}

/**
 * 从列表中移除指定萤火虫
 * @param {number} id - 萤火虫ID
 */
const removeFirefly = (id) => {
  const index = fireflies.value.findIndex(f => f.id === id)
  if (index > -1) {
    fireflies.value.splice(index, 1)
  }
}

/**
 * 生成萤火虫的样式对象
 * @param {Object} firefly - 萤火虫数据
 * @returns {Object} CSS 样式对象
 */
const getFireflyStyle = (firefly) => {
  return {
    // 定位
    left: `${firefly.startX}vw`,
    top: `${firefly.startY}vh`,
    
    // 尺寸
    width: `${firefly.size}px`,
    height: `${firefly.size}px`,
    
    // 透明度
    opacity: firefly.opacity,
    
    // CSS 变量：传递给动画使用
    '--float-distance': `${firefly.floatDistance}vh`,
    '--fade-in-end': `${FADE_IN_DURATION * 100}%`,
    '--fade-out-start': `${FADE_OUT_START * 100}%`,
    
    // 动画配置
    animationDuration: `${firefly.duration}ms`,
    animationDelay: `${firefly.delay}ms`
  }
}

/**
 * 开始生成循环
 * 按固定间隔生成新萤火虫，直到达到最大数量
 */
const startSpawning = () => {
  spawnTimer = setInterval(() => {
    if (fireflies.value.length < MAX_FIREFLIES) {
      createFirefly()
    }
  }, SPAWN_INTERVAL)
}

// ========== 生命周期钩子 ==========

onMounted(() => {
  // 初始化：立即生成3个，错开时间
  for (let i = 0; i < 3; i++) {
    setTimeout(createFirefly, i * 200)
  }
  
  // 启动持续生成
  startSpawning()
})

onUnmounted(() => {
  // 清理：停止生成器，清空列表
  clearInterval(spawnTimer)
  fireflies.value = []
})
</script>

<style scoped>
/* 容器：覆盖整个父元素，不阻挡鼠标事件 */
.fireflies-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 萤火虫本体 */
.firefly {
  position: absolute;
  border-radius: 50%;
  
  /* 径向渐变：中心白亮，边缘羽化透明 */
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.9) 0%,    /* 中心：90%不透明白色 */
    rgba(255, 255, 255, 0.4) 30%,   /* 30%处：40%不透明 */
    rgba(255, 255, 255, 0) 70%      /* 70%处：完全透明（羽化边缘） */
  );
  
  /* 多层阴影：营造光晕效果 */
  box-shadow: 
    0 0 6px rgba(255, 255, 255, 0.6),   /* 内层光晕 */
    0 0 12px rgba(255, 255, 255, 0.3),  /* 中层光晕 */
    0 0 20px rgba(255, 255, 255, 0.1);  /* 外层淡光 */
  
  /* 轻微模糊：让光点更柔和 */
  filter: blur(0.5px);
  
  /* 动画配置 */
  animation-name: float-up;
  animation-timing-function: linear;    /* 线性：匀速上漂 */
  animation-fill-mode: forwards;        /* 保持结束状态 */
  
  /* 硬件加速提示 */
  will-change: transform, opacity;
}

/**
 * 向上飘动动画
 * 0%:    屏幕下方，缩小，完全透明
 * 10%:   淡入完成，正常大小，完全不透明
 * 90%:   保持不透明，继续上漂
 * 100%:  到达顶部，缩小，完全透明
 */
@keyframes float-up {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  
  /* 淡入阶段 */
  10% {
    opacity: var(--opacity);
    transform: translateY(0) scale(1);
  }
  
  /* 持续上漂阶段 */
  90% {
    opacity: var(--opacity);
  }
  
  /* 淡出完成 */
  100% {
    /* translateY 为负值：向上移动 */
    transform: translateY(calc(-1 * var(--float-distance))) scale(0.3);
    opacity: 0;
  }
}
</style>