<template>
    <MatrixRain v-if="showMatrixRain" :initialScript="scriptLines" />
    <div v-else-if="noShow"></div>
    <div v-else class="command-prompt">
        <div v-for="scriptLine in scriptLines" :key="scriptLine.id">
            {{ scriptLine.line }}
        </div>
        <div v-if="store.scriptPin === 0">
            Username: <span v-if="showCursor">{{ typedText }}<span class="blinking-cursor">|</span></span>
        </div>
        <div v-if="showCursor && scriptLines.length > 0">
            {{ typedText }}<span class="blinking-cursor">|</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useStore } from "../../stores/counter"
import usePrompt from '~/components/commandPrompt/usePrompt';

const { scriptLines, typedText, showCursor, awaitingUserInput, showMatrixRain, noShow, processUserInput, callScript } = usePrompt();
const store = useStore()

function handleInput(e: KeyboardEvent) {
    if (e.key.length === 1 && awaitingUserInput.value) {
        typedText.value += e.key;
    } else if (e.key === "Backspace" && awaitingUserInput.value) {
        typedText.value = typedText.value.slice(0, -1);
    } else if (e.key === "Enter" && awaitingUserInput.value) {
        processUserInput();
    }
}

onMounted(async () => {
    awaitingUserInput.value = true;
    document.addEventListener("keydown", handleInput);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleInput);
});

defineExpose({
    callScript,
})

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
    0%, 100% {
        color: transparent;
    }
    50% {
        color: lime;
    }
}
</style>