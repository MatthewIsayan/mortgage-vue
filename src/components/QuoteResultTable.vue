<template>
    <DataTable
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="quoteResults.length"
        :value="quoteResults"
        tableStyle="min-width: 50rem"
    >
        <Column field="productName" header="Product Name"> </Column>
        <Column field="" header="Rate (%)">
            <template #body="bodyProps">
                {{ bodyProps.data.ratePct.toFixed(2) }}
            </template>
        </Column>
        <Column field="aprPct" header="APR (%)">
            <template #body="bodyProps">
                {{ bodyProps.data.aprPct.toFixed(2) }}
            </template></Column
        >
        <Column field="estimateMoPayment" header="Monthly Payment">
            <template #body="bodyProps">
                ${{ bodyProps.data.estimateMoPayment.toFixed(2) }}
            </template></Column
        >
        <Column field="feesAmt" header="Fees Amount">
            <template #body="bodyProps">
                ${{ bodyProps.data.feesAmt.toFixed(2) }}
            </template></Column
        >
    </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
interface QuoteResult {
    companyName: string;
    ratePct: number;
    productName: string;
    aprPct: number;
    estimateMoPayment: number;
    feesAmt: number;
}
interface QuoteResultTableProps {
    quoteResults: QuoteResult[];
}
const props = defineProps<QuoteResultTableProps>();
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
