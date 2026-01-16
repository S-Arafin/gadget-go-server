const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    try {
        await client.connect();
        
        await client.db("admin").command({ ping: 1 });
        console.log("GadgetGo DB Connected Successfully!");

        app.get('/', (req, res) => {
            res.send('GadgetGo Server is Running');
        });


    } catch (error) {
        console.error("Connection failed:", error);
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
