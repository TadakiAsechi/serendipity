<template>
    <div class="command-prompt">
        <div v-for="line in lines" :key="line.id">
            {{ line.text }}
        </div>
        <div v-if="lines.length === 0">
            Username: <span v-if="showCursor">{{ typedText }}<span class="blinking-cursor">|</span></span>
        </div>
        <div v-if="showCursor && lines.length > 0">
            {{ typedText }}<span class="blinking-cursor">|</span>
        </div>
        <textarea v-model="typedText" class="hidden-textarea"></textarea>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount } from "vue";

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
const CPUName = "Adam64"

function addLine(text: string, is_user:boolean = false) {
    if(is_user){
        text = `[${userName.value }] ${text}` 
    }
    lines.value.push({ id: Date.now(), text });
}

async function typeText(lineText: string, is_CPU: boolean = false ) {
    awaitingUserInput.value = false;

    if(is_CPU){
        typedText.value += `[${CPUName}]　`
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

function handleMobileInput() {
    if (typedText.value.endsWith('\n')) {
        typedText.value = typedText.value.trim();
        processUserInput();
    }
}


async function processUserInput() {
    awaitingUserInput.value = false;
    let userInputValue = ""

    if (typedText.value.trim() === "") return;

        userInputValue = typedText.value;

    if (lines.value.length === 0){
        userName.value = userInputValue
        loginPrompt.value += userInputValue
        addLine(loginPrompt.value);  
    }else{
        addLine(typedText.value, true);  
    }

    typedText.value = ""; 

    switch (lines.value.length) {
        case 1:
            await delay(500);
            await typeText("　");
            await typeText("Logging in... ");
            await typeText("　");
            await delay(500);
            await typeText(`Nice to meet you, ${userName.value}.`, true);
            await delay(500);
            await typeText("What's your email?", true);
            break;
        case 7:
            await delay(500);
            await typeText("Thank you for sharing your email!", true);
            break;
    }

    awaitingUserInput.value = true;
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
    0%, 100% {
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