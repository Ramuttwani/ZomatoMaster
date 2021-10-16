import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    descript: {type:String,required:true},
    isVeg: {type:Boolean,required:true},
    isContainEgg: {type:Boolean,required:true},
    category: {type:String,required:true},
    photos: {
        type:mongoose.Types.ObjectId,
        ref:"Images"
    },
    price:{type:Number,default:150,required:true},
    addOns:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Foods"
        }
    ],
    restaurants:{type:mongoose.Types.ObjectId,
          ref:"Restaurants",
        required:true}
},
{
    timestamps:true
});

export const FoodModel = mongoose.model("Foods",foodSchema);