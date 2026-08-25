require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/dbConnection");

const port = process.env.PORT || 5000; //port

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(() => {
        process.exitCode = 1;
    });

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });
