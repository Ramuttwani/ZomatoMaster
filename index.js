//env variable
require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routeConfig from "./config/route.config";
import passport from "passport";
import googleAuthConfig from "./config/google.config";
//API
import Auth from "./API/Auth";
import Restaurant from "./API/restaurant";
import Food from "./API/Food";
import Menu from "./API/menu";
import Image from "./API/Image"
import Orders from "./API/orders";
import Review from "./API/reviews";
//Database connection
import ConnectDB from "./Database/connection";                                     
const zomato = express();
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());
googleAuthConfig(passport);
//for application routes
routeConfig(passport);
zomato.use("/auth",Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food",Food);                                           
zomato.use("/menu",Menu); 
zomato.use("/image",Image); 
zomato.use("/order",Orders);
zomato.use("./reviews", Review);                                     
zomato.get("/",(req,res) => res.json({message: "setup complete"}));
                                                           
zomato.listen(4000, () => 
ConnectDB().then(() => console.log("server running"))
.catch(() => console.log("DB connection failed"))); 
               