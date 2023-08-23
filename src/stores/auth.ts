import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const storedUserID = sessionStorage.getItem("userID");
    const userID = ref(storedUserID);

    function setUserID(newUserID: string) {
        sessionStorage.setItem("userID", newUserID);
        userID.value = newUserID;
    }

    function signOut() {
        sessionStorage.removeItem("userID");
        userID.value = null;
    }

    const isSignedIn = computed(() => userID.value !== null);

    return { userID, signOut, setUserID, isSignedIn };
});
