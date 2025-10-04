import React from "react";
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
    created_at: string;
    profiles: Profile;
};

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="post-card">
            <div className="post-header">
                <img
                    src={post.profiles.avatar_url || "/default-avatar.png"}
                    alt={post.profiles.username}
                    className="post-avatar"
                />
                <div className="post-user-info">
                    <h3>{post.profiles.username}</h3>
                    <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                </div>
            </div>
            <p className="post-content">{post.title}</p>
        </div>
    );
}
