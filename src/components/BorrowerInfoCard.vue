<template>
    <Card class="card">
        <template #title>
            <div style="color: var(--primary-color)">
                {{ firstName }} {{ lastName }}
            </div>
        </template>
        <template #subtitle> Scenario ID: {{ scenarioIdentifier }} </template>
        <template #content>
            <div class="values">
                <div class="value-container">
                    <BaseLabel>Email</BaseLabel>
                    <p>{{ email }}</p>
                </div>
                <div class="value-container">
                    <BaseLabel>Phone</BaseLabel>
                    <p>{{ phoneNumber }}</p>
                </div>
            </div>
            <div class="value-container" style="margin-top: 1rem">
                <BaseLabel>Rate</BaseLabel>
                <p>{{ rateLongDesc }}</p>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
interface BorrowerInfoCardProps {
    scenarioIdentifier: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    rateLongDesc: string;
}

const props = defineProps<BorrowerInfoCardProps>();
</script>

<style scoped>
.card {
    width: fit-content;
    padding-right: 3rem;
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
