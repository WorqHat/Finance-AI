import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log(localFilePath);
    //upload
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath); //remove the locally saved temp file after upload

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temp file as upload failed
    return null;
  }
};
export { uploadOnCloudinary };
