import express from "express";
import router from "./src/router.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };


//Create an Express application instance.
const app = express();

//Middleware to understand JSON data
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

//Add a root route (GET /) that returns a short JSON response with a status code of 200.
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello, Web Services is running!" });
});

//Export the app.
export default app;