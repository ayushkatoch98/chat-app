import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', require: true},
    message: { type: String, require: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , require: true },
    created_at : { type: Date, default: Date.now}
});

export const messageModel = mongoose.model('Message', MessageSchema);
