const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDetails = new Schema(
    {
    username:{
        type:String,
        required:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    },
    profile_dp:{
        type:String,
        required:true,
    },
    profile_dp:{
        type:Array,
        required:true,
    },
    social_links:{
        type:Array,
        required:true,
    },
    notable_works:{
        type:Array,
        required:true,
    },
    my_works:{
        type:Array,
        required:true,
    },
},
{ collection: "UserDetails" }
);


const UserDetails = mongoose.model("UserDetails", UserDetails);
module.exports = { UserDetails };