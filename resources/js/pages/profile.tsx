import { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/uploadImage";
import '../../css/profile.css';
type Profile = {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: "", bio: "" });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { props } = usePage();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.visit("/login");
                return;
            }

            const { data, error } = await supabase
                .from("profiles")
                .select("id, username, avatar_url, bio")
                .eq("id", user.id)
                .single();

            if (error) console.error(error);
            else {
                setProfile(data);
                setFormData({ username: data.username || "", bio: data.bio || "" });
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (profile) {
            setFormData({ username: profile.username || "", bio: profile.bio || "" });
        }
        setAvatarFile(null);
        setAvatarPreview(null);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ファイルサイズチェック（5MB制限）
        if (file.size > 5 * 1024 * 1024) {
            alert("ファイルサイズは5MB以下にしてください");
            return;
        }

        // ファイル形式チェック
        if (!file.type.startsWith('image/')) {
            alert("画像ファイルを選択してください");
            return;
        }

        setAvatarFile(file);

        // プレビュー表示
        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatarPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!profile) return;

        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("ログインが必要です");
                return;
            }

            console.log("現在のユーザー:", user.id);

            let avatarUrl = profile.avatar_url;

            if (avatarFile) {
                console.log("アバター画像をアップロード中...", {
                    fileName: avatarFile.name,
                    fileSize: avatarFile.size,
                    fileType: avatarFile.type
                });

                const uploadedUrl = await uploadImage("avatars", avatarFile, user.id);
                if (uploadedUrl) {
                    avatarUrl = uploadedUrl;
                    console.log("アップロード成功:", uploadedUrl);
                } else {
                    alert("画像のアップロードに失敗しました。ブラウザのコンソールでエラー詳細を確認してください。");
                    return;
                }
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    username: formData.username || null,
                    bio: formData.bio || null,
                    avatar_url: avatarUrl
                })
                .eq("id", user.id);

            if (error) {
                console.error("プロフィール更新エラー:", error);
                alert(`保存に失敗しました: ${error.message}`);
            } else {
                setProfile({
                    ...profile,
                    username: formData.username,
                    bio: formData.bio,
                    avatar_url: avatarUrl
                });
                setIsEditing(false);
                setAvatarFile(null);
                setAvatarPreview(null);
                alert("プロフィールを更新しました！");
            }
        } catch (err) {
            console.error("予期しないエラー:", err);
            alert("予期しないエラーが発生しました");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.visit("/login");
    };

    const handleGoDashboard = () => {
        router.visit("/dashboard");
    };

    if (!profile) return <p className="text-center mt-10">読み込み中...</p>;

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1 className="profile-title">プロフィール</h1>

                {!isEditing ? (
                    <>
                        {/* 表示モード */}
                        <div className="avatar-container">
                            <div className="avatar-wrapper">
                                {profile.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="avatar"
                                        className="avatar-img"
                                    />
                                ) : (
                                    <svg
                                        className="avatar-placeholder"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <p className="profile-username">{profile.username}</p>
                            <p className="profile-bio">
                                {profile.bio || "自己紹介はまだありません。"}
                            </p>
                        </div>

                        <div className="button-group">
                            <button onClick={handleEdit} className="btn btn-edit">
                                プロフィールを編集
                            </button>
                            <button onClick={handleGoDashboard} className="btn btn-dashboard">
                                投稿一覧へ
                            </button>
                            <button onClick={handleLogout} className="btn btn-logout">
                                ログアウト
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* 編集モード */}
                        <div className="avatar-container">
                            <div className="avatar-wrapper">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="プレビュー"
                                        className="avatar-img"
                                    />
                                ) : profile.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="avatar"
                                        className="avatar-img"
                                    />
                                ) : (
                                    <svg
                                        className="avatar-placeholder"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>

                            <label className="file-select">
                                画像を選択
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden-input"
                                />
                            </label>

                            {avatarFile && (
                                <p className="selected-file">選択済み: {avatarFile.name}</p>
                            )}
                        </div>

                        <div className="form-section">
                            <div className="input-group">
                                <label className="input-label">ユーザー名</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    className="input-field"
                                    placeholder="ユーザー名を入力"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">自己紹介</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    className="textarea-field"
                                    placeholder="自己紹介を入力"
                                />
                            </div>
                        </div>

                        <div className="button-group">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="btn btn-save"
                            >
                                {isLoading ? "保存中..." : "保存"}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="btn btn-cancel"
                            >
                                キャンセル
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
