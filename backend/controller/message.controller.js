import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {

        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiver,
            message
        })
        res.status(201).json(newMessage);

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

    } catch (error) {
        console.log("Error in sendMessage controlle", error.message)
        return res.status(500).json({ error: 'Internal server error' });
    }
}