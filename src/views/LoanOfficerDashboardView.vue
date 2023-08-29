<template>
    <h2>Loan Officer Dashboard</h2>
    <p style="color: var(--text-color-secondary)">
        Select a row for more details
    </p>
    <div class="table-container" v-if="scenarios.length > 0">
        <ScenarioTable :scenarios="scenarios" />
    </div>
    <template v-else>
        <ProgressSpinner />
    </template>
</template>

<script setup lang="ts">
import ScenarioTable from "@/components/ScenarioTable.vue";
import ProgressSpinner from "primevue/progressspinner";

import { onMounted, reactive } from "vue";

const scenarios = reactive([] as any[]);

function getScenarios() {
    fetch(import.meta.env.VITE_API_URL + "/rate/SearchScenario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
