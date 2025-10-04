import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Inertia } from '@inertiajs/inertia';
import '../../../css/home.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handler_Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirm) {
            setError('パスワードが一致しません');
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('登録完了！確認メールをチェックしてください。');
            // サインアップ完了後はログインページに誘導する場合
            Inertia.visit('/login');
        }
    };

    return (
        <div className="home-container">
            <h1>サインアップ</h1>
            <p>カフェ投稿を始めるにはアカウント登録してください。</p>

            <form onSubmit={handler_Submit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '12px' }}>
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
                <input
                    type="password"
                    placeholder="パスワード確認"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                />

                {error && <div className="error">{error}</div>}
                {message && <div style={{ color: '#fff', marginBottom: '16px' }}>{message}</div>}

                <button type="submit" className="btn btn-signup">Sign Up</button>
            </form>
        </div>
    );
}
