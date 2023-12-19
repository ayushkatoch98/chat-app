import mongoose from 'mongoose'


const ConversationScheme = mongoose.Schema({
    participants : [ {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true} ]
});

export const conversationModel = mongoose.model('Conversation', ConversationScheme);

// export const getConversationByID = (id) => {
//     return conversationModel.findById(id)
// }

// export const getConversationByUserID = (userID, conversationID = null) => {

//     if (conversationID == null)
//         return conversationModel.find({$or : [{user_one: userID}, {user_two: userID}]})

//     return conversationModel.find({$or : [{user_one: userID}, {user_two: userID}] , $and :[ {_id : conversationID} ]})
// }


// export const createNewConversation = async (data) => {
//     return new conversationModel(data).save()
// }