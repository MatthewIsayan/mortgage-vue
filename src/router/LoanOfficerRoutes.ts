import { Permission } from "@/utils/Auth";
import type { RouteRecordRaw } from "vue-router";

const LoanOfficerRoutes: RouteRecordRaw[] = [
    {
        path: "/dashboard",
        name: "LoanOfficerDashboard",
        component: () => import("../views/LoanOfficerDashboardView.vue"),
        meta: {
            label: "Dashboard", // This is the label for the navigation menu
            requiredPermission: Permission.ViewLoanOfficerDashboard,
        },
    },
];

export default LoanOfficerRoutes;
