import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/get-quote",
        },
        {
            path: "/get-quote",
            name: "GetQuote",
            component: () => import("../views/GetQuoteView.vue"),
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () => import("../views/LoanOfficerDashboardView.vue"),
        },
        {
            path: "/scenario/:id",
            name: "Scenario",
            component: () => import("../views/ScenarioView.vue"),
        },
        {
            path: "/",
            name: "Login",
            component: () => import("../views/LoginView.vue"),
        },
    ],
});

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();
    if (
        // make sure the user is authenticated
        !authStore.isSignedIn &&
        // ❗️ Avoid an infinite redirect
        to.name !== "Login"
    ) {
        // redirect the user to the login page
        return { name: "Login" };
    }
});
export default router;
