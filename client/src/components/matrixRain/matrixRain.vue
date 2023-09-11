<template>
  <div class="matrix-rain" ref="matrixRainRef">
    <h1>loading</h1>
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

  const columns = window.innerWidth / 15; // Decreased from 20 to 15 to make it denser
  // const columns = window.innerWidth / 20; // Assuming 20px font-size

  const charactersPerColumn = 20;  // Increased from 10 to 20
  // const charactersPerColumn = 10;  // Adjust this to control the length of each column

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < charactersPerColumn; j++) {
      const span = document.createElement('span');
      span.textContent = String.fromCharCode(Math.floor(Math.random() * 93) + 33);

      // oprion1
      span.style.top = `${Math.random() * 100}vh`;
      // option2
      const colors = ['#0F0', '#2F2', '#4F4'];
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      //option3
      const animationDuration = Math.random() * 4 + 1; // Random duration between 1 to 5 seconds


      matrixRainEl?.appendChild(span);
      
      // const delay = i * 15 + j * 30;  // Adjusted delay calculation
      const delay = i * 20 + j * 50;  // Adjust the second multiplier to control delay between characters in a column
      

      animateDrop(span, delay);
    }
  }
};


const animateDrop = (span: HTMLElement, delay: number) => {
  const animationDuration = Math.random() * 3 + 2; // Random duration between 2 to 5 seconds

  span.style.animation = `drop ${animationDuration}s linear ${delay}ms infinite`;
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