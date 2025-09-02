import { useEffect, useState } from 'react'
import { getPosts } from '../api/api'
import BlogCard from '../components/BlogCard'

export const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadAllPosts() {
            try {
                setLoading(true)
                const data = await getPosts()
                // sorting the posts
                data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
                setPosts(data)
            } catch (err) {
                setError('Failed to load posts. Please try again later.')
                console.error('Error loading posts:', err)
            } finally {
                setLoading(false)
            }
        }
        loadAllPosts()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading posts...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
                        Latest Blog Posts
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover insightful articles and stories from our community of writers
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No posts yet</h2>
                        <p className="text-gray-500">Be the first to share your story!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post._id || post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Ready to share your story?</h2>
                        <p className="text-blue-100 mb-6">Join our community of writers and start creating today</p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md">
                            Create Your First Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
