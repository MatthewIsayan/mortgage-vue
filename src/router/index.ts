import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Permission, hasPermission } from "@/utils/Auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/get-quote",
            name: "GetQuote",
            component: () => import("../views/GetQuoteView.vue"),
            meta: {
                label: "Get Quote", // This is the label for the navigation menu
                requiredPermission: Permission.ViewGetQuote,
            },
        },
        {
            path: "/dashboard",
            name: "LoanOfficerDashboard",
            component: () => import("../views/LoanOfficerDashboardView.vue"),
            meta: {
                label: "Dashboard", // This is the label for the navigation menu
                requiredPermission: Permission.ViewLoanOfficerDashboard,
            },
        },
        {
            path: "/dashboard",
            name: "BorrowerDashboard",
            component: () => import("../views/BorrowerDashboardView.vue"),
            meta: {
                label: "Dashboard", // This is the label for the navigation menu
                requiredPermission: Permission.ViewBorrowerDashboard,
            },
        },
        {
            path: "/scenario/:id",
            name: "Scenario",
            component: () => import("../views/ScenarioView.vue"),
            meta: {
                requiredPermission: Permission.ViewScenario,
            },
        },
        {
            path: "/",
            name: "Login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/unauthorized",
            name: "Unauthorized",
            component: () => import("../views/UnauthorizedView.vue"),
        },
    ],
});

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isSignedIn && to.name !== "Login") {
        return { name: "Login" };
    }
    const userRole = authStore.user.role;
    if (to.name === "LoanOfficerDashboard" && userRole === "Borrower") {
        return { name: "BorrowerDashboard" };
    }
    // Check if the user has permission to access the route
    if (to.meta.requiredPermission) {
        if (
            !hasPermission(userRole, to.meta.requiredPermission as Permission)
        ) {
            // User doesn't have required permission, handle the redirection or error
            // For example, redirect to a suitable page or show an error message
            return { name: "Unauthorized" }; // Create an "Unauthorized" route
        }
    }
});
export default router;
