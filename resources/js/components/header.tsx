import React from "react";
import { Link, router } from "@inertiajs/react";
import { supabase } from "@/lib/supabase";
import "../../css/dashboard.css";

export default function Header() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.visit("/login");
    };
    return (
        <header className="dashboard-header">
            <div className="dashboard-logo">☕ Caffeine</div>
            <nav className="dashboard-nav">
                <Link href="/dashboard">ホーム</Link>
                <Link href="/profile">マイページ</Link>
                <button 
                    onClick={handleLogout} 
                    className="logout-btn"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}
                >
                    ログアウト
                </button>
            </nav>
        </header>
    );
}
