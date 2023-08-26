import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/utils/Auth";
import { Role } from "@/utils/Auth";
export const useAuthStore = defineStore("auth", () => {
    const storedUserID = sessionStorage.getItem("userID");
    const storedUserRole = sessionStorage.getItem("userRole");
    const storedUserName = sessionStorage.getItem("userName");

    const user = reactive<User>({
        id: storedUserID ? storedUserID : "0",
        name: storedUserName ? storedUserName : "Guest",
        role: storedUserRole ? (storedUserRole as Role) : Role.None,
    });

    function signIn(newUser: User) {
        sessionStorage.setItem("userID", newUser.id);
        sessionStorage.setItem("userName", newUser.name);
        sessionStorage.setItem("userRole", newUser.role);

        user.id = newUser.id;
        user.name = newUser.name;
        user.role = newUser.role;
    }

    function signOut() {
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userRole");

        user.id = "0";
        user.name = "Guest";
        user.role = Role.None;
    }

    const isSignedIn = computed(() => user.role !== Role.None);

    return { user, signOut, signIn, isSignedIn };
});
