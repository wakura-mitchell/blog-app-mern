import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../api/api';

export function Reading() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let params = useParams();
    const navigate = useNavigate();
    let id = params.id;

    useEffect(() => {
        async function loadPost() {
            try {
                setLoading(true);
                setError(null);
                let data = await getPost(id);
                if (data) {
                    let date = new Date(data.dateCreated);
                    data.dateCreated = date.toString();
                    setPost(data);
                } else {
                    setError('Post not found');
                }
            } catch (err) {
                setError('Failed to load post');
                console.error('Error loading post:', err);
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    ← Go Back
                </button>

                <article className="bg-white rounded-lg shadow-lg p-8">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <h2 className="text-xl text-gray-600 mb-4 font-medium">
                            {post.description}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Published:</span>
                            <span className="ml-2">{post.dateCreated?.slice(4, 15)}</span>
                            {post.author && (
                                <>
                                    <span className="mx-2">•</span>
                                    <span>By {post.author}</span>
                                </>
                            )}
                        </div>
                    </header>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
