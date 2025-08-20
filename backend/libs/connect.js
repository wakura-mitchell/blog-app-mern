// simple connection to mongodb database via mongodb compass and mongoose
const { MongoClient, ServerApiVersion } = require("mongodb");

// calling .env file
require("dotenv").config({ path: "./config.env" });

// MongoClient with MongoClientOptions object to set thr Stable API versions
const client = new MongoClient(process.env.COMPASS_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		depreciationErrors: true,
	},
});

// connecting to our db
let database;
module.exports = {
	// uses module.export to be able to use that file/function inside another file in express
	connectToServer: () => {
		database = client.db("blogData");
	},

	getDb: () => {
		return database;
	},
};

// test connection connection
/* async function run() {
    try{
        // connect client to the server
        await client.connect(),

        // send a ping to confirm a successful connection
        await client.db('admin').command({ping: 1})
        console.log('pinged your deployment, you successfully connected to mongodb')
    } finally {
        // ensure the client will close when you finish or there is an error
        await client.close()
    }
}

run().catch(console.dir) */
