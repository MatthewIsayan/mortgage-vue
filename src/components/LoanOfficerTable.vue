<template>
    <DataTable
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="scenarios.length"
        :value="scenarios"
        tableStyle="min-width: 50rem"
        sortField="scenarioIdentifier"
        :sortOrder="1"
        stripedRows
    >
        <Column field="scenarioIdentifier" header="ID" sortable> </Column>
        <Column field="rateShortDesc" header="Rate"> </Column>

        <Column header="Borrower">
            <template #body="bodyProps">
                {{ bodyProps.data.borFirstName }}
                {{ bodyProps.data.borLastName }}
            </template>
        </Column>
        <Column field="borPhoneNumber" header="Phone Number"> </Column>
        <Column field="borEmailAddress" header="Email"> </Column>
    </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";

interface Scenario {
    scenarioIdentifier: string;
    rateShortDesc: string;
    rateLongDesc: string;
    borFirstName: string;
    borLastName: string;
    borPhoneNumber: string;
    borEmailAddress: string;
}
interface DashboardTableProps {
    scenarios: Scenario[];
}
const props = defineProps<DashboardTableProps>();

// function onRowClick(e: any) {
//     router.push({
//         name: "Scenario",
//         params: { id: e.data.scenarioIdentifier },
//     });
// }
</script>

<style scoped>
.card {
    width: fit-content;
}
.p-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}
.p-table td {
    padding: 0.5rem;
    border: 1px solid #ccc;
}
.p-table td:first-child {
    font-weight: bold;
}
</style>
