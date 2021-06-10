const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



// https://medium.com/the-andela-way/how-to-upload-multiple-images-using-cloudinary-and-node-js-2f053b167b80
// uploads = async (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (error, result) => {
//             if(error) return res.status(500).send("upload image error")
//             console.log(result)
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type: "auto",
//             folder: folder
//         })
//     })
// }





module.exports = { cloudinary };