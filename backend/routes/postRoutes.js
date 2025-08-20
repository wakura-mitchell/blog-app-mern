// this is an example of post route file in MERN stack

const express = require("express");

// since we are using MongoDB, connecting to the database
const connect = require("../libs/connect.js");

// ObjectId is used to create unique identifiers for documents in MongoDB
const { ObjectId } = require("mongodb");

// create a router object using express which allows us to easily create our routes

// variable to hold the router object
let postRouter = express.Router();

// types of routes
// 1. GET route to fetch all posts
// 2. POST route to create a new post
// 3. PUT route to update a post
// 4. DELETE route to delete a post

// in context to this MERN stack application lets name our routes as

// 1 - Retrieve all posts
postRouter.route("/posts").get(async (req, res) => {
	// connect to the database
	let db = connect.getDb();

	// fetch all posts from the database
	let posts = await db.collection("posts").find({}).toArray();
	// handling errors
	// 1 - if there are no posts found
	// start by handling edge case that is if there are no posts found then handle normal case
	if (posts.length === 0) {
		return res.status(404).json({ message: "No posts found" });
	} else {
		// if posts are found then send them as a response
		res.status(200).json(posts);
	}
});
// .get is used to retrieve data
// this will be used to fetch all posts from the database.
// has 2 parameters request and response req, res

// 2 - Retrieve a single post
postRouter.route("/posts/:id").get(async (req, res) => {
	let db = connect.getDb();
	let posts = await db
		.collection("posts")
		.findOne({ _id: new ObjectId(req.params.id) });
	if (!posts) {
		return res
			.status(404)
			.json({ message: "There is no post with this id" });
	} else {
		res.status(200).json(posts);
	}
});

// 3 - Create a new post
postRouter.route("/posts").post(async (req, res) => {
	let db = connect.getDb();
	// req now is important as it contains the data we want to insert into the mongoDB database as object
	//let mongoObject = {} // create an empty object to hold the data
	// properties of the object in mongoDB
	let mongoObject = {
		title: req.body.title,
		description: req.body.description,
		content: req.body.content,
		author: req.body.author,
		dateCreated: req.body.dateCreated,
	};
	// insert the object into the database
	let posts = await db.collection("posts").insertOne(mongoObject);
	res.json(posts);
});

// 4 - Update a post
postRouter.route("/posts/:id").put(async (req, res) => {
	let db = connect.getDb();
	let mongoObject = {
		$set: {
			// $set is used to update the document in MongoDB
			title: req.body.title,
			description: req.body.description,
			content: req.body.content,
			author: req.body.author,
			dateCreated: req.body.dateCreated,
		},
	};
	// insert the object into the database
	let posts = await db
		.collection("posts")
		.updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
	res.json(posts);
});

// 5 - Delete a post
postRouter.route("/posts/:id").delete(async (req, res) => {
	let db = connect.getDb();
	// delete the post from the database
	let posts = await db
		.collection("posts")
		.deleteOne({ _id: new ObjectId(req.params.id) });
	if (posts.deletedCount === 0) {
		return res
			.status(404)
			.json({ message: "There is no post with this id" });
	} else {
		res.status(200).json({ message: "Post deleted successfully" });
	}
});

// export the router object so that it can be used in other files
module.exports = postRouter;
