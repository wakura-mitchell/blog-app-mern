import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        About Our Blog
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Welcome to BlogApp
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Welcome to our blog platform where ideas come to life! We believe in the power of sharing knowledge,
                            experiences, and insights through well-crafted content. Our platform provides a space for writers,
                            thinkers, and creators to connect with their audience.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            What We Offer
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
                            <li>A clean, modern interface for reading and writing blogs</li>
                            <li>Responsive design that works perfectly on all devices</li>
                            <li>Easy-to-use tools for creating and managing your content</li>
                            <li>A community of passionate writers and readers</li>
                        </ul>

                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Join Our Community
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Are you interested in sharing your thoughts and ideas with the world? We invite you to join our
                            community of writers and start creating amazing content.
                        </p>

                        <div className="text-center">
                            <Link
                                to="/create"
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Create Your First Blog Post
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Explore More
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-center">
                        Discover amazing content from our community. Browse through various topics and find inspiration
                        for your next read or write.
                    </p>
                </div>
            </div>
        </div>
    );
};
