<template>
    <div class="login-layout">
        <Card style="max-width: 450px">
            <template #title> Quick Login </template>
            <template #content>
                <div style="display: flex; flex-direction: column; gap: 2rem">
                    <Button
                        @click="routeTo($event, 'GetQuote', users[0])"
                        label="Login as Guest Borrower"
                        size="small"
                    ></Button>
                    <Button
                        @click="routeTo($event, 'BorrowerDashboard', users[1])"
                        label="Login as Borrower with Credentials"
                        size="small"
                    ></Button>
                    <Button
                        @click="
                            routeTo($event, 'LoanOfficerDashboard', users[2])
                        "
                        label="Login as Loan Officer"
                        size="small"
                    ></Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Role, type User } from "@/utils/Auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
function routeTo(e: any, route: string, user: User) {
    const { signIn } = useAuthStore();
    signIn(user);

    router.push({ name: route });
}

const users: User[] = [
    {
        id: "1",
        name: "Guest",
        role: Role.GuestBorrower,
    },
    {
        id: "2",
        name: "Matt",
        role: Role.Borrower,
    },
    {
        id: "3",
        name: "John",
        role: Role.LoanOfficer,
    },
];
</script>

<style scoped>
.login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
@/utils/AuthModel @/utils/AuthModel
