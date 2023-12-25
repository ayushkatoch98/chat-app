
import express from 'express';
import mongoose from 'mongoose'
// const {createUser} =  require("../db/User");
import { userModel } from "../db/User.js";
import * as jwt from 'jsonwebtoken'




export const signup = async (req, res) => {
    // console.log("WOW RUN", getUsers());
    console.log(req.body)


    if (!req.file) {
        console.log("File not found");
        return res.status(400).send('No file uploaded.');
    }

  // Access the uploaded file details
    const { originalname, filename, path } = req.file;
    // return res.status(404).json({message : "testing"});
    const { email, username, password } = req.body;

    const user = await userModel.findOne({ $or: [{ email }, { username }] })
    if (user) {
        return res.status(401).json({ message: "User exist" });
    }

    try {
        // TODO: salt + hash password 
        const newUser = await new userModel({ email, username, password, image: "/uploads/" + filename }).save();
        return res.status(200).json({ message: "Account Created" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Unable to create account" });
    }

}

export const signin = async (req, res) => {

    const { email, password } = req.body

    console.log("email and password", email, password);
    const user = await userModel.findOne({ email, password });
    console.log("USER OBJ", user)
    if (!user) {
        return res.status(401).send({ message: "Email / Password is incorrect" });
    }

    const { _id, username } = user;
    console.log("USER IS ", _id.toHexString(), username);
    // TODO: user ENV to store secrets
    const token = jwt.default.sign({ _id: _id.toHexString(), username: username, email: email }, "SOME_SECRET", { expiresIn: '24h' })

    res.cookie('AUTH-TOKEN', token, { path: '/', httpOnly: false,  secure: false });
    // bad practice, sending all user info including the password
    // considering project scope its alright for now
    return res.status(200).json(user);




}

