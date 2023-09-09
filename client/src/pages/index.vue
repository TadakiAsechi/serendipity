<template>
    <div>
        <CommandPromptMobile v-if="isMobile" />
        <CommandPrompt v-else />
    </div>
</template>

<script>
import CommandPrompt from '~/components/CommandPrompt.vue';
import CommandPromptMobile  from '~/components/CommandPromptMobile.vue';

let isMobile = false;

if (process.client) { // Ensure this runs only on client-side
    const userAgent = window.navigator.userAgent.toLowerCase();
    isMobile = /mobile|iphone|ipad|android/.test(userAgent);
}

export default {
    components: {
        CommandPrompt,
        CommandPromptMobile,
    }
};
</script>