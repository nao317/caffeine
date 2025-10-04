import { supabase } from "@/lib/supabase";
import { Inertia } from "@inertiajs/inertia";

const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout failed:", error.message);
    } else {
        Inertia.visit("/login"); // ログインページへリダイレクト
    }
};
