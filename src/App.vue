<script setup lang="ts">
import Menubar from "primevue/menubar";
const items = [
    {
        label: "Get Quote",
        to: { name: "GetQuote" },
    },
];
</script>

<template>
    <div class="card relative z-2">
        <Menubar :model="items">
            <template #start>
                <h1 style="margin-left: 1rem; margin-right: 1rem">
                    Mortgage App
                </h1>
            </template>
        </Menubar>
    </div>
    <main class="main">
        <router-view />
    </main>
</template>

<style scoped>
.main {
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>
