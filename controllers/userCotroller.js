const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@decription Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required to be filled.");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email Already in use.");
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);//10 means 10 round hashing
    // console.log(hashedPassword);
    const user = await User.create({
        username, email, password: hashedPassword,
    });
    // console.log(user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Invalid user data!");
    }
    // res.json({ message: "Register the user." });
});

//@decription Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required to be filled!");
    }
    const user = await User.findOne({ email });
    // compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        // if all valid then provide an access token to the user.
        const accessToken = jwt.sign({//jwt.sign() for login token
            user: {//provide payload(user info) for token
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }

    // res.json({ message: "Login the user." });
});

//@decription Current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
    // res.json({ message: "Current user info" });
});

module.exports = { registerUser, loginUser, currentUser };