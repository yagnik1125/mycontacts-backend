const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the user name!"],
        },
        email: {
            type: String,
            required: [true, "Please add the user email address!"],
            unique: [true, "Email address already in use!"],
        },
        password:{
            type:String,
            required:[true,"Please asdd the user password!"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model("User",userSchema);