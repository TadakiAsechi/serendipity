<template>
    <MatrixRain v-if="showMatrixRain" :initialScript="scriptLines" />
    <div v-else-if="noShow"></div>
    <div v-else class="command-prompt">
        <div v-for="scriptLine in scriptLines" :key="scriptLine.id">
            {{ scriptLine.line }}
        </div>
        <div v-if="counterStore.scriptPin === 0">
            Username: <span v-if="showCursor">{{ typedText }}<span class="blinking-cursor">|</span></span>
        </div>
        <div v-if="showCursor && scriptLines.length > 0">
            {{ typedText }}<span class="blinking-cursor">|</span>
        </div>
        <textarea v-model="typedText" class="hidden-textarea"></textarea>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "../../stores/counter"
import usePrompt from '~/components/commandPrompt/usePrompt';

const { scriptLines, typedText, showCursor, awaitingUserInput, showMatrixRain, noShow,processUserInput } = usePrompt();
const counterStore = useCounterStore()

function handleMobileInput() {
    if (typedText.value.endsWith('\n')) {
        typedText.value = typedText.value.trim();
        processUserInput();
    }
}

onMounted(async () => {
    awaitingUserInput.value = true;
    document.addEventListener("input", handleMobileInput);
});

onBeforeUnmount(() => {
    document.removeEventListener("input", handleMobileInput);
});

</script>


<style>
.command-prompt {
    font-family: 'Courier New', monospace;
    background-color: black;
    color: lime;
    padding: 10px;
    overflow-wrap: break-word;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
}

.blinking-cursor {
    animation: blink 1s step-end infinite;
}

@keyframes blink {

    0%,
    100% {
        color: transparent;
    }

    50% {
        color: lime;
    }
}

.hidden-textarea {
    /* position: absolute;
    bottom: 0;
    left: 0; */
    width: 100vw;
    height: 10px;
    opacity: 0.01;
    z-index: -1;
    display: block;
}
</style>