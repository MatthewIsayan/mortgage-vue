<template>
    <form @submit.prevent="saveInfo" class="form">
        <div class="label-input">
            <BaseLabel>First Name</BaseLabel>
            <InputText v-model="formData.firstName"></InputText>
        </div>
        <div class="label-input">
            <BaseLabel>Last Name</BaseLabel>
            <InputText v-model="formData.lastName"></InputText>
        </div>
        <div class="label-input">
            <BaseLabel>Email</BaseLabel>
            <InputText v-model="formData.email"></InputText>
        </div>
        <div class="label-input">
            <BaseLabel>Phone Number</BaseLabel>
            <InputText v-model="formData.phoneNumber"></InputText>
        </div>
        <div class="label-input">
            <BaseLabel>User ID</BaseLabel>
            <InputText v-model="formData.userID"></InputText>
        </div>
        <div class="actions">
            <Button
                label="Cancel"
                severity="secondary"
                type="reset"
                size="small"
                @click="(dialogRef as any).close()"
            ></Button>
            <Button label="Save" type="submit" size="small"></Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { inject } from "vue";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userID?: string;
}
const dialogRef = inject("dialogRef");
const emit = defineEmits<{
    (e: "saveQuote", formData: FormData): void;
}>();
const formData = reactive<FormData>({
    firstName: "matt",
    lastName: "smith",
    email: "matt@test.com",
    phoneNumber: "1234567890",
    userID: "15",
});

function saveInfo() {
    emit("saveQuote", formData);
}
</script>

<style scoped>
.actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

.label-input {
    display: flex;
    flex-direction: column;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
