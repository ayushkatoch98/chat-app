import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({

    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sessionToken: {type: String, required: false},
    friends: [{type: mongoose.Schema.ObjectId, ref: 'User', unique:false}],
    image: {type: String, required: true, default: "/uploads/default.png"}
});


export const userModel = mongoose.model('User', UserSchema);

// export const getUsers = () => {
//     return userModel.find()
// }
// export const getUserByEmail = (email) => {
//     return userModel.find({email})
// }

// export const getUserByID = (id) => {
//     return userModel.findById(id)
// }


// export const updateUser = (data) => {
//     return userModel.findOneAndUpdate(data.email , data);
// }

// export const createUser = (data) => {
//     return new userModel(data).save()
// }

// export const checkEmailAndPassword = (email , password) => {
//     return userModel.findOne({email, password})
// }

// export const addConversation = (userID, conversationID) => {
    
//     return userModel.findOneAndUpdate(userID , {
//         $push: {conversations: conversationID},
//         new: true
//     });
// }
