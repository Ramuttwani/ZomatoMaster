import express from "express";
import { OrderModel } from "../../Database/AllModels";
const Router = express.Router();

/*
Route            /
Description      Get all orders
Params           None
Access           Public
Method           GET
*/

Router.get("/:_id",passport.authenticate("jwt",{session: false}) ,async(req,res) => {
   try{
     const {_id} = req.params;
     const getOrders =await OrderModel.findOne({user:_id});
     if(!getOrders){
        return res.status(404).json({error:"user not found"});
     }
   }catch(error){
return res.status(500).json({error:error.message});
   }
});
/*
Route            /new
Description      add new order
Params           None
Access           Public
Method           POST
*/
Router.get("/new/:_id", async(req,res) => {
    try{
      const {_id} = req.params;
      const {orderDetails} = req.body;
      const addNewOrder = await OrderModel.findOneAndUpdate({
          user: _id},
          {
              $push:{orderDetails:orderDetails}
          },
          {
              new:true
          }
      );
      return res.json({order:addNewOrder});
    }catch(error){
 return res.status(500).json({error:error.message});
    }
 });
export default Router;