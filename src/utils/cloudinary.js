import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // file system module jo hume local files ko read or delete krne me help karega

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    }); 



    const uploadCloudinary = async (localfilepath) => {
        try {
            if(!localfilepath) return null;
            const result=await cloudinary.uploader.upload(localfilepath,{ resource_type: "auto" });

            console.log("Cloudinary upload result:",result);

            // upload hone k bad local file ko delete kr dena chahiye
            return result;
        }catch (error) {
            console.log("Error uploading to Cloudinary:",error);
            fs.unlinkSync(localfilepath); // ye synchronous method hai jo file ko delete kr dega
        }
            return null;

        
    }

    export {uploadCloudinary};