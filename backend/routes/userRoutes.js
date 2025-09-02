// this is an example of post route file in MERN stack

const express = require("express");

// since we are using MongoDB, connecting to the database
const connect = require("../libs/connect.js");

// ObjectId is used to create unique identifiers for documents in MongoDB
const { ObjectId } = require("mongodb");

// create a router object using express which allows us to easily create our routes

// variable to hold the router object
let userRouter = express.Router();

// types of routes
// 1. GET route to fetch all users
// 2. POST route to create a new post
// 3. PUT route to update a post
// 4. DELETE route to delete a post

// in context to this MERN stack application lets name our routes as

// 1 - Retrieve all users
userRouter.route("/users").get(async (req, res) => {
	// connect to the database
	let db = connect.getDb();

	// fetch all users from the database
	let users = await db.collection("users").find({}).toArray();
	// handling errors
	// 1 - if there are no users found
	// start by handling edge case that is if there are no users found then handle normal case
	if (users.length === 0) {
		return res.status(404).json({ message: "No users found" });
	} else {
		// if users are found then send them as a response
		res.status(200).json(users);
	}
});
// .get is used to retrieve data
// this will be used to fetch all users from the database.
// has 2 parameters request and response req, res

// 2 - Retrieve a single post
userRouter.route("/users/:id").get(async (req, res) => {
	let db = connect.getDb();
	let users = await db
		.collection("users")
		.findOne({ _id: new ObjectId(req.params.id) });
	if (!users) {
		return res
			.status(404)
			.json({ message: "There is no post with this id" });
	} else {
		res.status(200).json(users);
	}
});

// 3 - Create a new post
userRouter.route("/users").post(async (req, res) => {
	let db = connect.getDb();
	let mongoObject = {
		// $set is used to update the document in MongoDB
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		joinDate: new Date(),
		posts: [],
	};
	// insert the object into the database
	let users = await db.collection("users").insertOne(mongoObject);
	res.json(users);
});

// 4 - Update a user
userRouter.route("/users/:id").put(async (req, res) => {
	let db = connect.getDb();
	let mongoObject = {
		$set: {
			// $set is used to update the document in MongoDB
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			joinDate: req.body.joinDate,
			posts: req.body.posts,
		},
	};
	// insert the object into the database
	let users = await db
		.collection("users")
		.updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
	res.json(users);
});

// 5 - Delete a post
userRouter.route("/users/:id").delete(async (req, res) => {
	let db = connect.getDb();
	// delete the post from the database
	let users = await db
		.collection("users")
		.deleteOne({ _id: new ObjectId(req.params.id) });
	if (users.deletedCount === 0) {
		return res
			.status(404)
			.json({ message: "There is no post with this id" });
	} else {
		res.status(200).json({ message: "Post deleted successfully" });
	}
});

// export the router object so that it can be used in other files
module.exports = userRouter;
