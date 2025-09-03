import { useState } from 'react'
import { createPost } from '../api/api'
import { useNavigate } from 'react-router-dom'

export const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            // compiling all the set fields into a single object
            // then upload the object to mongodb
            let submitObject = {
                title: title,
                desc: desc,
                content: content,
                author: null,
                dateCreated: new Date()
            }
            await createPost(submitObject)
            setSuccess(true)
            // Reset form
            setTitle('')
            setDesc('')
            setContent('')
            // Redirect to home after a short delay
            setTimeout(() => {
                navigate('/home')
            }, 2000)
        } catch (err) {
            setError('Failed to create blog post. Please try again.')
            console.error('Error creating post:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
                        Create New Blog Post
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Share your thoughts and insights with our community of readers
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <div className="text-green-500 text-2xl mr-3">✅</div>
                        <div>
                            <h3 className="text-green-800 font-semibold">Blog post created successfully!</h3>
                            <p className="text-green-600">Redirecting to home page...</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <div className="text-red-500 text-2xl mr-3">⚠️</div>
                        <div>
                            <h3 className="text-red-800 font-semibold">Error creating blog post</h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                        <h2 className="text-white text-2xl font-bold">Write Your Story</h2>
                        <p className="text-blue-100 mt-2">Fill in the details below to publish your blog post</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Blog Post Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                                required
                                name="title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                placeholder="Enter an engaging title for your blog post"
                            />
                            <p className="text-sm text-gray-500 mt-1">{title.length}/100 characters</p>
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Blog Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                maxLength={250}
                                required
                                name="description"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                placeholder="Write a brief description that captures the essence of your post"
                            />
                            <p className="text-sm text-gray-500 mt-1">{desc.length}/250 characters</p>
                        </div>

                        {/* Content Field */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                                Blog Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={5000}
                                required
                                name="content"
                                rows={12}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-vertical"
                                placeholder="Write your blog post content here. Share your thoughts, experiences, and insights..."
                            />
                            <p className="text-sm text-gray-500 mt-1">{content.length}/5000 characters</p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Publishing...
                                    </div>
                                ) : (
                                    'Publish Blog Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tips Section */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Writing Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <div className="text-blue-500 text-2xl mr-3">💡</div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Engaging Title</h4>
                                <p className="text-gray-600 text-sm">Choose a title that captures attention and clearly describes your content.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="text-purple-500 text-2xl mr-3">📝</div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Clear Description</h4>
                                <p className="text-gray-600 text-sm">Write a concise description that summarizes your post's main points.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="text-indigo-500 text-2xl mr-3">🎯</div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Structured Content</h4>
                                <p className="text-gray-600 text-sm">Organize your content with clear paragraphs and logical flow.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="text-green-500 text-2xl mr-3">✨</div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Unique Voice</h4>
                                <p className="text-gray-600 text-sm">Share your personal perspective and authentic voice in your writing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
