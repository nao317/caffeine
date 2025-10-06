import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Inertia } from '@inertiajs/inertia';
import '../../../css/home.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [username, setUsername] = useState(''); // ユーザー名追加
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

        // 1. Supabase Auth にユーザー登録
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username } // ユーザーメタデータに username 保存
            }
        });

        if (authError || !authData.user) {
            setError(authError?.message || 'サインアップに失敗しました');
            return;
        }

        const user = authData.user;

        // 2. profiles テーブルにユーザー行を作成
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: user.id,
                    username,
                    avatar_url: null,
                    bio: null
                }
            ]);

        if (profileError) {
            setError('profiles 作成に失敗しました: ' + profileError.message);
            return;
        }

        setMessage('登録完了！認証メールをチェックしてください。');
        Inertia.visit('/login');
    };

    return (
        <div className="home-container">
            <h1>サインアップ</h1>
            <p>投稿を始めるにはアカウント登録してください。</p>

            <form className="signup-form" onSubmit={handler_Submit}>
                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
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
                {message && <div className="message">{message}</div>}

                <button type="submit" className="btn btn-signup">Sign Up</button>
            </form>
        </div>
    );
}
