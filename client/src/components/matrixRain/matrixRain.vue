<template>
  <div class="matrix-rain" ref="matrixRainRef">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  createMatrixRain();
});

const matrixRainRef: Ref<HTMLElement | null> = ref(null);

const createMatrixRain = () => {
  const matrixRainEl = matrixRainRef.value;
  
  if (!matrixRainEl) {
    console.error("matrixRainEl not found");
    return;
  }

  //各カラムの幅
  const columns = window.innerWidth / 15;
  //各カラムの文字数
  const charactersPerColumn = 25; 

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < charactersPerColumn; j++) {
      const span = document.createElement('span');

      // ランダムで文字を生成
      span.textContent = String.fromCharCode(Math.floor(Math.random() * 93) + 33);
      // 開始位置
      span.style.top = `${Math.random() * 100}vh`;
      // 色合い
      const colors = ['#0F0', '#2F2', '#4F4'];
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      // スピード
      const animationDuration = Math.random() * 4 + 1; 

      matrixRainEl?.appendChild(span);
      
      // 文字ごとのdelay
      const delay = i * 20 + j * 50; 
      
      animateDrop(span, delay, animationDuration);
    }
  }
};


const animateDrop = (span: HTMLElement, delay: number, duration: number) => {
  const animationDuration = Math.random() * 3 + 2; // Random duration between 2 to 5 seconds

  span.style.animation = `drop ${duration}s linear ${delay}ms infinite`;
};
</script>


<style>
@keyframes drop {
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.matrix-rain {
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    color: #0F0;
    background-color: #000;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .matrix-rain > span {
    display: inline-block;
    margin-right: 2px;
  }
</style>