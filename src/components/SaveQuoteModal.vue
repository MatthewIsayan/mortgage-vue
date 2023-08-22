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
}
const dialogRef = inject("dialogRef");
const emit = defineEmits<{
    (e: "saveQuote", formData: FormData): void;
}>();
const formData = reactive({
    firstName: "",
    lastName: "",
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
