import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Post Image Placeholder */}
            <div className="h-48 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center">
                <div className="text-4xl text-gray-400">📄</div>
            </div>

            {/* Post Content */}
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        {post.dateCreated ? formatDate(post.dateCreated) : 'No date'}
                    </span>
                    <Link
                        to={`/read/${post._id || post.id}`}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </article>
    )
}
