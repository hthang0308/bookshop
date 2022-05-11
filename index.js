const express = require("express");
const morgan = require("morgan");
const app = express();

const connectDB = require("./config/database");
const routes = require("./routes");
const cors = require("cors");

const port = process.env.PORT || 5000;

// HTTP logger
app.use(morgan("dev"));

// Connect to database
connectDB();

// Allow access from any localhost port
app.use(cors({ origin: "*" }));

// Routes
routes(app);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
