
import express from 'express';
import mongoose from 'mongoose'
// const {createUser} =  require("../db/User");
import { userModel } from "../db/User.js";
import * as jwt from 'jsonwebtoken'

import { messageModel } from '../db/Message.js';
import { conversationModel } from '../db/Conversation.js';


export const createMessage = async (userID, friendID, userData, message) => {
    console.log(userID, friendID);
    const convo = await conversationModel.findOne({participants : {$all : [friendID, userID]}})
    if (!convo){
        console.log("CONVO NOT FOUND");
        return "";
    }
    const newMessage = await new messageModel({sender: userID, message: message, conversation_id : convo._id}).save();
    const mess  = newMessage.toJSON();
    mess.sender = userData;

    return mess;
}

export const createUserMessage = async (req, res) => {

    const loggedInUserID = req.userData._id;
    
    const {userID, message} = req.body;
    console.log("Sender and Receiver" , loggedInUserID, userID);
    if(!mongoose.Types.ObjectId.isValid(userID)){
        return res.status(404).send({message : "Invalid userID"});
    }

    const returnData = createMessage(loggedInUserID, userID, req.userData, message);


    res.status(200).send({message: "success" , data: {newMessage: returnData}});
  

}

export const getAllMessages = async (req, res) => {

    const loggedInUserID = req.userData._id;

  
    // Parse the query parameters
    const userID = req.query.userID;
  
   
    // Your logic based on the parameter
    console.log('Friend UserID', userID);
    // TODO: Bad practice its better to either get first 100 or maybe 50.... 
    // lazy loading could be implemented
    const friend = await userModel.findOne({_id : userID})

    if (!friend){
        return res.status(404).json({message: "Friend not found"});
    }
    const convo = await conversationModel.findOne({ participants: { $all : [userID, loggedInUserID] }}).populate("participants");
    
    if (!convo){
        return res.status(404).send({message: "Conversation not found"});
    }
    
    const messages = await messageModel.find({conversation_id : convo._id}).populate('sender');

    for (let i = 0; i < messages.length; i++){
        console.log("running");
        messages[i].receiver = friend;

    }


    const returnData = {
        participants : convo.participants,
        messages: messages,
        conversationID: convo._id
    }

    res.status(200).send( { message: "success" , data : returnData} )

}