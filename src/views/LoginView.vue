<template>
    <div class="login-layout">
        <Card style="max-width: 450px">
            <template #title> Quick Login </template>
            <template #content>
                <div style="display: flex; flex-direction: column; gap: 2rem">
                    <Button
                        @click="routeTo($event, 'GetQuote', 'Guest Borrower')"
                        label="Login as Guest Borrower"
                        size="small"
                    ></Button>
                    <Button
                        @click="routeTo($event, 'GetQuote', 'Borrower')"
                        label="Login as Borrower with Credentials"
                        disabled
                        size="small"
                    ></Button>
                    <Button
                        @click="routeTo($event, 'Dashboard', 'Loan Officer')"
                        label="Login as Loan Officer"
                        size="small"
                    ></Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
function routeTo(e: any, route: string, role: string) {
    const { setUserID, userID } = useAuthStore();
    setUserID(role);

    router.push({ name: route });
}
</script>

<style scoped>
.login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
