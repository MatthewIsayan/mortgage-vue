<template></template>

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

<style scoped></style>
