<template>
    <div>
        <mobile v-if="isMobile" />
        <desktop v-else />
    </div>
</template>

<script>
import { ref,onMounted } from "vue";

import desktop from '~/components/commandPrompt/desktop.vue';
import mobile  from '~/components/commandPrompt/mobile.vue';

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
        desktop,
        mobile,
    }
};
</script>