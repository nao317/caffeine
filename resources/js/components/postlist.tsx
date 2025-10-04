import React from "react";

type Profile = {
    id: string;
    username: string;
    avatar_url?: string;
    bio?: string;
};

type Post = {
    id: number;
    title: string;
    created_at: string;
    user_id: string;
    profiles: Profile | null;
};

type PostListProps = {
    posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        {post.profiles?.avatar_url ? (
                            <img
                                src={post.profiles.avatar_url}
                                alt="avatar"
                                className="avatar"
                            />
                        ) : (
                            <div className="avatar placeholder">?</div>
                        )}
                        <div>
                            <p className="username">
                                {post.profiles?.username || "不明なユーザー"}
                            </p>
                            <p className="date">
                                {new Date(post.created_at).toLocaleString("ja-JP")}
                            </p>
                        </div>
                    </div>
                    <p className="post-content">{post.title}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
