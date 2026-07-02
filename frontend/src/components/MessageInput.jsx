import { MdImage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { chatStore } from "../store/chatStore";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage } = chatStore();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    // Maximum image size: 2 MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please select an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) {
      toast.error("Enter a message or select an image.");
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image,
      });

      setText("");
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="p-1 md:p-2 bg-base-200 fixed bottom-2 w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="rounded-lg hover:bg-base-300 flex items-center justify-center"
        >
          <MdImage className="size-11 text-primary" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImage}
        />

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-slate-700 text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSendMessage}
          className="p-3 rounded-lg bg-slate-700 text-white"
        >
          <LuSendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;