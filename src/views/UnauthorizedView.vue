<template>
    <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page.</p>
        <p>Redirecting in 2 seconds.</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
    const router = useRouter();
    setTimeout(() => {
        router.push({ name: "Login" });
    }, 2000);
});
</script>

<style scoped></style>
