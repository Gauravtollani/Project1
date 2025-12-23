// bcrypt password hashing ke liye use hoga
// jwt token generate krne ke liye use hoga
// jike pass token hoga usko data mil jaaega 


import mongoose,{schema} from "mongoose";
import mongooseAggreatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true// ye line search ko fast karne ke liye hai,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim:true,
        },
        avatar:{
            type:String,// url de denge 
            required:true,
        },
        coverImage:{
            type:String,// url de denge 
            required:false,
        },
        watchHistory:[   // mongoose array package use krnege paginate krke
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"],
            trim:true,

        },
        refreshToken:{
            type:String,
        }

    },{timestamps:true} );


userSchema.pre("save", async function (next) {  // ye function tab chalega jab bhi user save hoga
   if (!this.isModified("password")) return next(); // agar password modify nahi hua to next pe jao
    {
        this.password= bcrypt.hash(this.password,10);
        next();
    }
});   

                    // isPasswordCorrect khud ka function hai jo humne banaya hai
userSchema.methods.isPasswordCorrect= async function(password){  // ye function password ko compare karega
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken= function(){// ye function access token generate karega
    jwt.sign(
        {_id:this._id,
        username:this.username,
        fullname:this.fullname,
        email:this.email,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}// ye line token ke expiry time ko set karegi
    );

    
}
userSchema.methods.generateRefreshToken= function(){// ye function refresh token generate karega
    jwt.sign(
        {_id:this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}// ye line token ke expiry time ko set karegi   

    );
};

export const User=mongoose.model("User",userSchema);