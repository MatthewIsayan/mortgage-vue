import { Permission } from "@/utils/Auth";
import type { RouteRecordRaw } from "vue-router";

const BorrowerRoutes: RouteRecordRaw[] = [
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
        name: "BorrowerDashboard",
        component: () => import("../views/BorrowerDashboardView.vue"),
        meta: {
            label: "Dashboard", // This is the label for the navigation menu
            requiredPermission: Permission.ViewBorrowerDashboard,
        },
    },
];

export default BorrowerRoutes;
