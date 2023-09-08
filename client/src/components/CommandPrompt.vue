<template>
    <div class="command-prompt">
        <div v-for="line in lines" :key="line.id">
            {{ line.text }}
        </div>
        <div v-if="lines.length === 0">
            {{ loginPrompt }}<span v-if="showCursor">{{ typedText }}<span class="blinking-cursor">|</span></span>
        </div>
        <div v-if="showCursor && lines.length > 0">
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
const userName = ref("");
const loginPrompt = ref("Username: ")

function addLine(text: string) {
    lines.value.push({ id: Date.now(), text });
}

async function typeText(lineText: string, role: string = "" ) {
    awaitingUserInput.value = false;

    if(role === "CPU"){
        typedText.value += "[Sum99]　"
    } else if (role === "USER") {
        typedText.value += "[" + "username" + "]　"
    } 

    await delay(300);

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
    let userInputValue = typedText.value;

    if (lines.value.length === 0){
        userName.value = userInputValue
        loginPrompt.value += userInputValue
        addLine(loginPrompt.value);  
    }else{
        addLine(typedText.value);  
    }

    typedText.value = ""; 

    switch (lines.value.length) {
        case 1:
            await delay(500);
            await typeText("　");
            await typeText("Loging in... ");
            await typeText("　");
            await delay(500);
            await typeText("Nice to meet you, " + userInputValue + ".", "CPU");
            await delay(500);
            await typeText("What's your email?", "CPU");
            break;
        case 8:
            await delay(500);
            await typeText("Thank you for sharing your email!", "CPU");
            break;
    }

    awaitingUserInput.value = true;
}

onMounted(async () => {
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