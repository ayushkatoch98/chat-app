
import express from 'express';
import mongoose from 'mongoose'
// const {createUser} =  require("../db/User");
import { userModel } from "../db/User.js";
import * as jwt from 'jsonwebtoken'
import { conversationModel } from '../db/Conversation.js';


export const getAllUserConversations = async (req, res) => {

    const userID = req.userData._id

    if(!mongoose.Types.ObjectId.isValid(userID)){
        return res.send("Invalid userID");
    }

    const conversations = await conversationModel.find({ participants: {$in : [userID]} })

    res.status(200).send(JSON.stringify(conversations));

}