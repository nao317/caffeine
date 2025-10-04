import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import "../../css/dashboard.css";
export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data: user } = await supabase.auth.getUser();
        if (!user?.user) return alert("ログインしてください。");

        const { error } = await supabase.from("posts").insert({
            title,
            user_id: user.user.id,
        });

        if (error) {
            console.error(error);
            alert("投稿に失敗しました");
        } else {
            setTitle("");
            onPostCreated();
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <textarea
                className="post-input"
                placeholder="今日のカフェ体験をシェアしよう ☕"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="post-button">
                投稿する
            </button>
        </form>
    );
}
