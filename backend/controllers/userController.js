import { conversationModel } from '../db/Conversation.js';
import { userModel } from '../db/User.js';
import mongoose from 'mongoose'


export const addFriend = async (req, res) => {


    const { username } = req.body;

    const friend = await userModel.findOne({ username })

    if (!friend) {
        console.log("NOT FOIND!")
        return res.status(404).json({ message: "No user with the username " + username + " found." });
    }

    const friendUsername = friend.get("username");

    const session = await mongoose.startSession();

    try {

        await session.startTransaction();

        let temp;
        // console.log("USER DATA", req.userData);
        console.log("USERDATA is ", req.userData);
        temp = await userModel.findOneAndUpdate({ _id: req.userData._id }, { $push: { friends: friend._id } })
        temp = await userModel.findOneAndUpdate({ username: friendUsername }, { $push: { friends: req.userData._id } })

        temp = await new conversationModel({ participants: [req.userData._id, friend._id] }).save();

        await session.commitTransaction();
    }
    catch (err) {

        console.log("Something went wrong", err)
        await session.abortTransaction();
        return res.status(404).json({ message: "Something Went wrong" });

    }
    finally {
        await session.endSession();
    }

    return res.status(200).json({ message: "Friend Added", data: friend });
    // TODO: add option to accept friend request
    // considering project scope its not required atm




}


export const getAllFriends = async (req, res) => {

    const userId = req.userData._id;

    const userData = await userModel.findOne({ _id: userId })

    if (!userData) {
        return res.status(404).json({ message: "User not found" })
    }

    // const conversations = await conversationModel.find({
    //     participants: {
    //         $elemMatch: {
    //             $in: [userId],
    //             $ne: [userId]
    //         }
    //     }
    // }
    // ).populate("participants");

    const friendData = await userModel.find({_id : {$in: userData.friends}})
    console.log(friendData);
    return res.status(200).json({ message: "succes", data: friendData })

}