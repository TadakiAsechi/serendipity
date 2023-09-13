<template>
    <div class="container">
        <img class="centered-image" src="~/assets/img/robo.png" />
        <div class="dialogue-box">
            カイハツチュウ
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style>
.container {
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Start aligning from the top */
    padding-top: 5%; /* Adjust this value to move the image higher or lower */
}


.centered-image {
    max-width: 50%;
    max-height: 50%;
}

.dialogue-box {
    width: 80%;
    height: 30%;
    border: thick solid;
    border-radius: 10px;
    border-color: aliceblue;
    color: lime;
    margin-top: 20px;
    padding: 10px 20px;
    overflow: auto;
}
</style>
