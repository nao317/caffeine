import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "../components/header";
import PostForm from "../components/postform";
import PostCard from "../components/postcard";
import "../../css/dashboard.css";

type Profile = {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
};

type Post = {
    id: number;
    title: string;
    image_url: string | null;
    created_at: string;
    user_id: string;
    profiles: Profile;
};

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select(`id, title, image_url, created_at, user_id, profiles ( id, username, avatar_url, bio )`)
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setPosts(data as unknown as Post[]);
    };

    return (
        <div className="dashboard-container">
            <Header />
            <main className="dashboard-main">
                <PostForm onPostCreated={fetchPosts} />
                <div className="post-list">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
}
