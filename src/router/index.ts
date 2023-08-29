import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Permission, hasPermission } from "@/utils/Auth";
import BorrowerRoutes from "./BorrowerRoutes";
import SharedRoutes from "./SharedRoutes";
import LoanOfficerRoutes from "./LoanOfficerRoutes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...SharedRoutes, ...LoanOfficerRoutes, ...BorrowerRoutes],
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
