
import express from 'express';
import mongoose from 'mongoose'
// const {createUser} =  require("../db/User");
import { userModel} from "../db/User.js";
import * as jwt from 'jsonwebtoken'



export const verfiyJtwToken = async (token) => {

    return await jwt.default.verify(token, "SOME_SECRET")
}
export const checkIfSignedIn = async(req, res, next) => {

    const token = req.cookies['AUTH-TOKEN'];

    if (!token || token.length == 0){
        return res.send("JWT Token not passed in cookies");
    }
    console.log("token is ", token);
    
    try{

        const data = await verfiyJtwToken(token);
        req.userData = data;
        console.log("DATA IS ", data);

    }
    catch(err){
        return res.status(401).json({message : "Token Expired"});
    }
    
    next();

}

