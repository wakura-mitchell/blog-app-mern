const express = require("express");
const connect = require("../libs/connect.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

let userRouter = express.Router();

// Helper function to check if email is already taken
async function isEmailTaken(db, email) {
	try {
		console.log("Checking if email is taken:", email);
		const existingUser = await db
			.collection("users")
			.findOne({ email: email });
		console.log("Existing user found:", existingUser);
		return existingUser !== null;
	} catch (error) {
		console.error("Error in isEmailTaken:", error);
		throw error;
	}
}

// 1 - Retrieve all users
userRouter.route("/users").get(async (req, res) => {
	try {
		let db = connect.getDb();
		let users = await db.collection("users").find({}).toArray();
		// handling errors
		if (users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		} else {
			res.status(200).json(users);
		}
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// 2 - Retrieve a single user
userRouter.route("/users/:id").get(async (req, res) => {
	try {
		let db = connect.getDb();
		let users = await db
			.collection("users")
			.findOne({ _id: new ObjectId(req.params.id) });
		if (!users) {
			return res
				.status(404)
				.json({ message: "There is no user with this id" });
		} else {
			res.status(200).json(users);
		}
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// 3 - Create a new user
userRouter.route("/users").post(async (req, res) => {
	try {
		let db = connect.getDb();

		// Validate required fields
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name, email, and password are required" });
		}

		// Check if email is already taken
		let emailTaken;
		try {
			emailTaken = await isEmailTaken(db, email);
		} catch (error) {
			console.error("Error checking emailTaken:", error);
			return res
				.status(500)
				.json({ message: "Error checking email availability" });
		}
		if (emailTaken) {
			return res.status(400).json({ message: "Email already in use" });
		}

		// Hash the password before storing it in the database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		let mongoObject = {
			name: name,
			email: email,
			password: hashedPassword,
			joinDate: new Date(),
			posts: [],
		};

		let result = await db.collection("users").insertOne(mongoObject);

		if (result.acknowledged) {
			res.status(201).json({
				message: "User created successfully",
				userId: result.insertedId,
			});
		} else {
			res.status(500).json({ message: "Failed to create user" });
		}
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// 4 - Update a user
userRouter.route("/users/:id").put(async (req, res) => {
	try {
		let db = connect.getDb();
		let mongoObject = {
			$set: {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				joinDate: req.body.joinDate,
				posts: req.body.posts,
			},
		};
		let users = await db
			.collection("users")
			.updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
		res.json(users);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// 5 - Delete a user
userRouter.route("/users/:id").delete(async (req, res) => {
	try {
		let db = connect.getDb();
		let users = await db
			.collection("users")
			.deleteOne({ _id: new ObjectId(req.params.id) });
		if (users.deletedCount === 0) {
			return res
				.status(404)
				.json({ message: "There is no user with this id" });
		} else {
			res.status(200).json({ message: "user deleted successfully" });
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = userRouter;
