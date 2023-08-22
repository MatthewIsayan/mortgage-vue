<template>
    <h2>Loan Officer Dashboard</h2>
    <div class="table-container">
        <LoanOfficerTable :scenarios="scenarios" />
    </div>
</template>

<script setup lang="ts">
import LoanOfficerTable from "@/components/LoanOfficerTable.vue";
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
