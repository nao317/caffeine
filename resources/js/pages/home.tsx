// home.tsx

import '../../css/home.css';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Caffeine</h1>
            <p>コーヒーやエナジードリンクなど、カフェインが入った美味しい飲み物をシェア</p>
            <div>
                <Link href="/login">
                <button className="btn btn-login">Log In</button>
                </Link>
                <Link href="/signup">
                <button className="btn btn-login">Sign Up</button>
                </Link>
            </div>
        </div>
    );
}