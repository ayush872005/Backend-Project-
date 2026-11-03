import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localfilePath) => {
    try{
        if(!localfilePath) return null
        const response = cloudinary.uploader.upload(localfilePath ,{
            resource_type : "auto"
        })
        consloe.log("file uploaded to cloudinary" , response.url);
        return response 
    }catch(error){
        fs.unlinkSync(localfilePath)  // remove locally saved temp file 
        console.log("error while uploading file to cloudinary" , error.message);
        return null;
    }
}

export {uploadToCloudinary}