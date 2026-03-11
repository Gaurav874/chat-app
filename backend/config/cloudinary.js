const cloudinary = require("cloudinary").v2;

exports.cloudinary = cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    secret_key:process.env.API_SECRET
});