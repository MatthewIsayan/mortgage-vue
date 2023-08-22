<template>
    <Card class="card">
        <template #title>
            <div style="color: var(--primary-color)">
                {{ companyName }}
            </div>
        </template>
        <template #subtitle>
            {{ productName }}
        </template>
        <template #content>
            <div class="values">
                <div class="value-container">
                    <BaseLabel>Rate</BaseLabel>
                    <p>{{ ratePct.toFixed(2) }}%</p>
                </div>
                <div class="value-container">
                    <BaseLabel>APR</BaseLabel>
                    <p>{{ aprPct.toFixed(2) }}%</p>
                </div>
                <div class="value-container">
                    <BaseLabel>Monthly<br />Payment</BaseLabel>
                    <p>${{ monthlyPaymentAmt.toFixed(2) }}</p>
                </div>
            </div>
        </template>
        <template #footer>
            <BaseLabel>Fees</BaseLabel>
            ${{ feesAmt.toFixed(2) }}
        </template>
    </Card>
</template>

<script setup lang="ts">
interface QuoteResultProps {
    companyName: string;
    ratePct: number;
    productName: string;
    aprPct: number;
    monthlyPaymentAmt: number;
    feesAmt: number;
}
const props = defineProps<QuoteResultProps>();
</script>

<style scoped>
.card {
    width: fit-content;
}
.values {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4rem;
}
.value-container {
    font-size: 1.3em;
}
p {
    margin: 0;
}
</style>
