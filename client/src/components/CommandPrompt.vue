<template>
    <div class="command-prompt">
        <div v-for="line in lines" :key="line.id">
            {{ line.text }}
        </div>
        <div v-if="showCursor">
            {{ typedText }}<span class="blinking-cursor">|</span>
        </div>
    </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, nextTick} from "vue";

interface Line {
    id: number;
    text: string;
}

const lines = ref<Line[]>([]);
const typedText = ref("");
const showCursor = ref(true);
const awaitingUserInput = ref(false);

function addLine(text: string) {
    lines.value.push({ id: Date.now(), text });
}

async function typeText(lineText: string) {
    awaitingUserInput.value = false;
    for (const char of lineText) {
        typedText.value += char;
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    addLine(typedText.value);
    typedText.value = ""; 
    awaitingUserInput.value = true;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleInput(e: KeyboardEvent) {
    if (e.key.length === 1 && awaitingUserInput.value) {
        typedText.value += e.key;
    } else if (e.key === "Backspace" && awaitingUserInput.value) {
        typedText.value = typedText.value.slice(0, -1);
    } else if (e.key === "Enter" && awaitingUserInput.value) {
        processUserInput();
    }
}

async function processUserInput() {
    awaitingUserInput.value = false;

    if (typedText.value.trim() === "") return;

    addLine(typedText.value);  
    let userInputValue = typedText.value;
    typedText.value = ""; 

    switch (lines.value.length) {
        case 3:
            await delay(500);
            await typeText("Nice to meet you, " + userInputValue + ".");
            await delay(500);
            await typeText("What's your email?");
            break;
        case 6:
            await delay(500);
            await typeText("Thank you for sharing your email!");
            break;
    }

    awaitingUserInput.value = true;
}

onMounted(async () => {
    await typeText("Konnichiwa.");
    await delay(1000);
    await typeText("What's your name?");
    awaitingUserInput.value = true;
    document.addEventListener("keydown", handleInput);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleInput);
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
    0%, 100% {
        color: transparent;
    }
    50% {
        color: lime;
    }
}
</style>