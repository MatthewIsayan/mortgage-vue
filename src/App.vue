<script setup lang="ts">
import Menubar from "primevue/menubar";
import { computed, reactive, ref, watch } from "vue";
import { useAuthStore } from "./stores/auth";
import { Permission, getPermissionsForRole, hasPermission } from "@/utils/Auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const navItems = computed(() => {
    const userRole = auth.user.role;

    // Create an array to store the navigation items
    let items: any[] = [];

    // Loop through your routes and filter based on user's permissions
    router.getRoutes().forEach((route) => {
        const requiredPermission = route.meta.requiredPermission;

        // Check if the user has permission to access the route
        if (
            (!requiredPermission ||
                hasPermission(userRole, requiredPermission as Permission)) &&
            route.meta.label
        ) {
            items.push({
                label: route.meta.label,
                to: { name: route.name },
            });
        }
    });

    return items;
});
function signOutUser() {
    auth.signOut();
    router.push({ name: "Login" });
}
const userLabel = computed(
    () =>
        `Welcome, ${auth.user.role} ${
            auth.user.name === "Guest" ? "" : auth.user.name
        }`
);

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
    <Menubar :model="navItems" v-if="auth.isSignedIn">
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
