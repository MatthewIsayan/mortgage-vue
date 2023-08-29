import { Permission } from "@/utils/Auth";
import type { RouteRecordRaw } from "vue-router";

const SharedRoutes: RouteRecordRaw[] = [
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
];

export default SharedRoutes;
