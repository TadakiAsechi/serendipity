<template>
    <div>
        <CommandPromptMobile v-if="isMobile" />
        <CommandPrompt v-else />
    </div>
</template>

<script>
import { ref,onMounted } from "vue";

import CommandPrompt from '~/components/CommandPrompt.vue';
import CommandPromptMobile  from '~/components/CommandPromptMobile.vue';

export default {
    setup() {
        const isMobile = ref(false);

        onMounted(() => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            console.log(userAgent)
            isMobile.value = /mobile|iphone|ipad|android/.test(userAgent);
        })

        return { isMobile };

    },
    components: {
        CommandPrompt,
        CommandPromptMobile,
    }
};
</script>