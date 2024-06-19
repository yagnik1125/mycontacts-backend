const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]//bearer token Start with Bearer and followed by space and token

        // console.log(token);
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Attach the user information to the request object
            req.user = decoded.user;

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

        // if(!token){
        //     res.status(401);
        //     throw new Error("Not authorized, token failed");
        // }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = validateToken;