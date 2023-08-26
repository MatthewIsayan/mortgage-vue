<template>
    <h2>Welcome, {{ auth.user.name }}</h2>
    <p style="color: var(--text-color-secondary)">
        Select a row for more details
    </p>
    <h3>Previously Requested Quotes</h3>
    <div class="table-container">
        <ScenarioTable :scenarios="scenarios" />
    </div>
</template>

<script setup lang="ts">
import ScenarioTable from "@/components/ScenarioTable.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted, reactive } from "vue";

const scenarios = reactive([] as any[]);
const auth = useAuthStore();
function getScenarios() {
    fetch(import.meta.env.VITE_API_URL + "/rate/SearchScenario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            borFirstName: auth.user.name,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            data.scenarioSummaryList.forEach((scenario: any) => {
                scenarios.push(scenario);
            });
        });
}

onMounted(() => {
    getScenarios();
});
</script>

<style scoped>
.table-container {
    max-width: 70rem;
}
</style>
