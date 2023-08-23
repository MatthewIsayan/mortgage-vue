<script setup lang="ts">
import Menubar from "primevue/menubar";
import router from "./router";
import { computed, reactive, ref, watch } from "vue";
import { useAuthStore } from "./stores/auth";
const adminItems = [
    {
        label: "Get Quote",
        to: { name: "GetQuote" },
    },
    {
        label: "Dashboard",
        to: { name: "Dashboard" },
    },
];
const borrowerItems = [
    {
        label: "Get Quote",
        to: { name: "GetQuote" },
    },
];

const loanOfficerItems = [
    {
        label: "Dashboard",
        to: { name: "Dashboard" },
    },
];

const auth = useAuthStore();

function signOutUser() {
    auth.signOut();
    router.push({ name: "Login" });
}
const userLabel = computed(() => `Welcome, ${auth.userID}`);

const userActions = [
    {
        label: "Sign Out",
        icon: "pi pi-sign-out",
        command: () => {
            signOutUser();
        },
    },
];
</script>

<template>
    <Menubar
        :model="
            auth.userID === 'Loan Officer' ? loanOfficerItems : borrowerItems
        "
        v-if="auth.isSignedIn"
    >
        <template #start>
            <h1 style="margin-left: 1rem; margin-right: 1rem">Loan App</h1>
        </template>
        <template #end>
            <SplitButton
                :label="userLabel"
                :model="userActions"
                size="small"
                text
            />
        </template>
    </Menubar>
    <main class="main">
        <router-view />
    </main>
</template>

<style scoped>
.main {
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>
