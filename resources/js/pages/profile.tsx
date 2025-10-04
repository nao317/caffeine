import { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { supabase } from "@/lib/supabase";

type Profile = {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
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
            else setProfile(data);
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.visit("/login");
    };

    const handleGoDashboard = () => {
        router.visit("/dashboard");
    };

    if (!profile) return <p className="text-center mt-10">読み込み中...</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    プロフィール
                </h1>
                <div className="flex flex-col items-center">
                    <img
                        src={profile.avatar_url || "/default-avatar.png"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <p className="text-lg font-semibold">{profile.username}</p>
                    <p className="text-gray-500 mt-2">{profile.bio || "自己紹介はまだありません。"}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    <button
                        onClick={handleGoDashboard}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                    >
                        投稿一覧へ
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl transition"
                    >
                        ログアウト
                    </button>
                </div>
            </div>
        </div>
    );
}
