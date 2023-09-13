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
    justify-content: flex-start;
    padding-top: 5%;
}


.centered-image {
    max-width: 50%;
    max-height: 50%;
    opacity: 0; 
    animation: fadeIn 5s forwards;
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
    opacity: 0; 
    animation: fadeIn 5s forwards;

}

@keyframes fadeIn {
    to {
        opacity: 1; /* End opacity is 1 (fully visible) */
    }
}
</style>
