import express from "express";
import { getDb } from "./src/db/connect.js";

//Create an Express application instance.
const app = express();

//Middleware to understand JSON data
app.use(express.json());

//Add a root route (GET /) that returns a short JSON response with a status code of 200.
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello, Web Services is running!" });
});

//MongoDb Practise-Activity:Add a temporary GET /trails route before the final export.
app.get('/trails', async (req, res) => {
  try {
    const allTrails = await getDb().collection('trails').find({}).toArray();
    return res.status(200).json(allTrails);
  } catch (error) {
    console.error('Failed to retrieve trails:', error.message);
    return res.status(500).json({ message: 'Failed to retrieve trails' });
  }
});

//Export the app.
export default app;