const path = require("path");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ensureDatabaseConnection = async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        next(error);
    }
};

app.use("/api", ensureDatabaseConnection);
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

module.exports = app;
