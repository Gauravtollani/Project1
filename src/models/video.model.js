import mongoose,{Schema} from "mongoose";
import mongooseAggreatePaginate from "mongoose-aggregate-paginate-v2";


const videoScehma=new mongoose.Schema(
    {
        videoFile:{
            type:String,// url denge
            required:true,
        },
        thumbnail:{
            type:String,// url denge
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,// seconds me denge culinary se
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:false,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

    },{timestamps:true});


videoScehma.plugin(mongooseAggreatePaginate);// ye line hume paginate krne me help karegi   

export const Video=mongoose.model("Video",videoScehma);