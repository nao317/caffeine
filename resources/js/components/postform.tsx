import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/uploadImage";
import "../../css/dashboard.css";
export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        console.log("ファイルが選択されました:", file?.name);
        setImage(file);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data: user } = await supabase.auth.getUser();
        if (!user?.user) return alert("ログインしてください。");

        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImage("post_images", image, user.user.id);
            if (!imageUrl) return alert("画像アップロード失敗");
        }

        const { error } = await supabase.from("posts").insert({
            title,
            user_id: user.user.id,
            image_url: imageUrl,
        });

        if (error) {
            console.error(error);
            alert("投稿に失敗しました");
        } else {
            setTitle("");
            setImage(null);
            // ファイル入力をリセット
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            onPostCreated();
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <textarea
                className="post-input"
                placeholder="今日行ったカフェやコーヒーをシェア"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="fileImageInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="file-upload-label">
                ファイルを選択
            </label>
            {image && (
                <p className="selected-file-name">選択済み: {image.name}</p>
            )}
            <button type="submit" className="post-button">
                投稿
            </button>
        </form>
    );
}
