import React from "react";
import { Link } from "@inertiajs/react";
import "../../css/dashboard.css";

export default function Header() {
    return (
        <header className="dashboard-header">
            <div className="dashboard-logo">☕ Caffeine</div>
            <nav className="dashboard-nav">
                <Link href="/dashboard">ホーム</Link>
                <Link href="/profile">マイページ</Link>
                <Link href="/logout">ログアウト</Link>
            </nav>
        </header>
    );
}
