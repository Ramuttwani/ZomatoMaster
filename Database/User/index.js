import  mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   fullname: {type:String,required: true},
   email: {type:String,required: true},
   password: {type:String},
   address: [{detail: {type:String}, for: {type:String}}],
   phonenumber: [{type: Number}]
},
{
   timestamps:true
});
userSchema.methods.generateJwtToken = function() {
   return jwt.sign({user: this._id.toString()},"ZomatoApp");
};
userSchema.statics.findEmailAndPhone = async ({email,phoneNumber}) => {
   const checkUserByEmail = await UserModel.findOne({email});
   const checkUserByphone = await UserModel.findOne({phoneNumber});
   if(checkUserByEmail || checkUserByphone){
      throw new Error("User already exist");
   }
   return false;
};
userSchema.statics.findByEmailAndPassword = async ({email,password}) => {
   const user = await UserModel.findOne({email});
   if(!user) throw new Error("User does not exist");
   const doesPasswordMatch = await bcrypt.compare(password, user.password)
   if(!doesPasswordMatch){
      throw new Error("Invalid password");
   }
   return user;
};
userSchema.pre("save",function(next){
   const user = this;
   if(!user.isModified("password")) return next();
   bcrypt.genSalt(8,(error,salt) => {
      if(error) return next(error);
      bcrypt.hash(user.password,salt,(error,hash) => {
        if(error) return next(error);
        user.password = hash;
        return next();
      });
   });
});

export const UserModel = mongoose.model("Users", userSchema);