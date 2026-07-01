import Users from "../model/userModel.js";
import Messages from "../model/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const contactsForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const users = await Users.find({
      _id: { $ne: loggedUserId },
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in contactsForSidebar:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { _id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Messages.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;

    const senderId = req.user._id;
    const receiverId = req.params._id;

    let imageUrl = "";

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Messages.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};