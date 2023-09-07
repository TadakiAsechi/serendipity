<template>
    <div class="command-prompt">
        <div v-for="line in lines" :key="line.id">
            {{ line.text }}
        </div>
        <div v-if="showCursor">{{ typedText }}<span class="blinking-cursor">|</span></div>
    </div>
</template>

<script setup lang="ts">
    import {ref, onMounted, onBeforeUnmount} from "vue";

    interface Line {
        id: number;
        text: string;
    }

    const lines = ref<Line[]>([]);
    const typedText = ref("")
    const showCursor = ref(true)

    function addLine(text: string) {
        lines.value.push({ id: Date.now(), text});
    }

    // blur blur blur blur
    async function typeText(lineText: string) {
        for (const char of lineText) {
            typedText.value += char;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        addLine(typedText.value);
        typedText.value = ""; 
    }

    function delay(ms: number) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }

    function handleInput(e: KeyboardEvent) {
        if (e.key.length === 1) {
            typedText.value += e.key;
        } else if (e.key === "Backspace") {
            typedText.value = typedText.value.slice(0, -1);
        }
    }

    onMounted(async () => {
        await typeText("Konnichiwa.");
        await delay(1000);
        await typeText("Kimi wa dare ?");
        document.addEventListener("keyup", handleInput);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("keyup", handleInput);
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