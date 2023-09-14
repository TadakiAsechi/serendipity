<template>
    <div>
        <desktop />
    </div>
</template>

<script>
import { ref,onMounted } from "vue";

import desktop from '~/components/secondPage/desktop.vue';
// import mobile  from '~/components/secondPage/mobile.vue';
// import matrixRain  from '~/components/matrixRain/matrixRain.vue';


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
        // mobile,
        // matrixRain,
    }
};
</script>