<template>
    <div class="container">
        <img class="centered-image" src="~/assets/img/robo.png" />
        <div class="dialogue-box">
            <desktop ref="desktopCommandPrompt"/> 
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from "../stores/counter"
import desktop from '~/components/commandPrompt/desktop.vue';

export default {
    components: {
        desktop,
    },
    setup() {
        const store = useStore()
        const desktopCommandPrompt = ref();

        onMounted(() => {
            store.scriptPin = 4;
            desktopCommandPrompt.value.callScript();
        });

        return {
            desktopCommandPrompt
        };
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

.container {
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 5%;
}


.centered-image {
    max-width: 50%;
    max-height: 50%;
    opacity: 0; 
    animation: fadeIn 5s forwards;
}

.dialogue-box {
    width: 80%;
    max-height: 260px;
    height: 40%; 
    border: thick solid;
    border-radius: 10px;
    border-color: aliceblue;
    color: lime;
    margin-top: 20px;
    padding: 10px 20px;
    overflow: auto;
    opacity: 0; 
    animation: fadeIn 5s forwards;
}

@media (max-width: 735px) {
    .dialogue-box {
        max-height: 400px;
    }
    .centered-image {
        min-height: 320px;
        min-width: 320px;
    }
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>
