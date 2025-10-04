import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import '../../../css/home.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('メールアドレスまたはパスワードが違います');
            return;
        }
        Inertia.visit('/dashboard');
    };

    return (
        <div className="home-container">
            <h1>ログイン</h1>
            <p>カフェ投稿を楽しむにはログインしてください。</p>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {error && <div className="error">{error}</div>}

                <button type="submit" className="btn btn-login">ログイン</button>
            </form>

            <p style={{ marginTop: '24px', fontSize: '0.9rem' }}>
                アカウントをお持ちでない方は
                <Link href="/signup" style={{ color: '#fff', textDecoration: 'underline', marginLeft: '4px' }}>
                    サインアップ
                </Link>
            </p>
        </div>
    );
}
