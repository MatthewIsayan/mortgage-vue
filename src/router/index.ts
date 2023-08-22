import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    ],
});

export default router;
