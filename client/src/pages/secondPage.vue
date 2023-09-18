<template>
    <div>
        <second />
    </div>
</template>

<script>
import { ref,onMounted } from "vue";

import second from '~/components/secondPage/second.vue';


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
        second,
    }
};
</script>