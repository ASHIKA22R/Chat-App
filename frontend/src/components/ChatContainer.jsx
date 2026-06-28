import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import Message from "./Message.jsx";

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full bg-base-100 shadow-lg md:w-auto">
      <ChatHeader />
      <div className=" flex-1 overflow-y-auto">
        <Message />
      </div>
      <div className="shrink p-4 bg-base-200">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;