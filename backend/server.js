const connect = require("../backend/libs/connect.js"); // uses require to call forth the required document in route as we call connect.js
const express = require("express");
const cors = require("cors");
// importing our routes
const posts = require("./routes/postRoutes.js");
const users = require("./routes/userRoutes.js");

// create express application
const app = express();

// create and run express server
const PORT = 3000;

//
app.use(cors()); // app.use is a function that mounts middleware, tell express how to share resources across domains
app.use(express.json()); // app.use is a function that mounts middleware, tell express to parse incoming JSON requests
app.use(posts);
app.use(users);

// setting express server
app.listen(PORT, () => {
	connect.connectToServer();
	console.log(`Server is running on port ${PORT}`);

	// will take 2 arguments PORT and the call back function to our connectTOServer in connect.js file depending on how you have configured your connection file so that it will be run when our server
});
