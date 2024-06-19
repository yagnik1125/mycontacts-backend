const express = require("express"); //express server
const dotenc = require("dotenv").config();
const errorHandler=require("./middleware/errorHandler");
const connectDb=require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000; //port

// app.get("/api/contacts", (req, res) => { //gonna return request and results
//     // res.send("Get all contacts");
//     res.status(200).json({ message: "Get all contacts" });//json format response with 200 status code
// });

app.use(express.json());//middleware to parse the json body

// Serve static files from the 'public' directory
app.use(express.static('public'));
// app.use(express.static('publicUser'));

app.use("/api/contacts",require("./routes/contactRoutes"));//known as middleware
app.use("/api/users",require("./routes/userRoutes"));//known as middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});