// lets make it easy to interact with the backend routes

// specific posts need to be referenced by their ID

// when creating or updating a post we will need object to represent the post data

import axios from "axios";

// define the base URL for the API
const API_URL = "http://localhost:3000/";

export async function getPosts() {
	// function to get all posts
	const response = await axios.get(`${API_URL}posts`);

	// check if the response is successful
	if (response.status === 200) {
		return response.data; // return the data from the response
	} else {
		throw new Error("Failed to fetch posts"); // throw an error if the request fails
	}
}

export async function getPost(id) {
	// function to get a specific post by ID
	const response = await axios.get(`${API_URL}posts/${id}`);

	// check if the response is successful
	if (response.status === 200) {
		return response.data; // return the data from the response
	} else {
		throw new Error("Failed to fetch post by ID"); // throw an error if the request fails
	}
}

export async function createPost(post) {
	// function to create a new post
	const response = await axios.post(`${API_URL}posts`, post);
	// check if the response is successful
	if (response.status === 201) {
		return response.data; // return the data from the response
	}
}

export async function updatePost(id, post) {
	// function to update an existing post by ID
	const response = await axios.put(`${API_URL}posts/${id}`, post);
	// check if the response is successful
	if (response.status === 200) {
		return response.data; // return the data from the response
	} else {
		throw new Error("Failed to update post"); // throw an error if the request fails
	}
}

export async function deletePost(id) {
	// function to delete a post by ID
	const response = await axios.delete(`${API_URL}posts/${id}`);
	// check if the response is successful
	if (response.status === 200) {
		return response.data; // return the data from the response
	} else {
		throw new Error("Failed to delete post"); // throw an error if the request fails
	}
}
