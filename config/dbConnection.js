const mongoose = require("mongoose");
let connectionPromise;

const connectDb = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.CONNECTION_STRING) {
        throw new Error("CONNECTION_STRING is not configured");
    }

    connectionPromise = mongoose.connect(process.env.CONNECTION_STRING)
        .then((connect) => {
            console.log("Database connected: ", connect.connection.host, connect.connection.name);
            return connect.connection;
        })
        .catch((error) => {
            connectionPromise = undefined;
            throw error;
        });

    return connectionPromise;
};

module.exports = connectDb;