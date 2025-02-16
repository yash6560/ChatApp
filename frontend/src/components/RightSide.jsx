import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import RightHead from "./RightHead";
import Send from "./Send";

const RightSide = () => {
  const { getAllMessages, messages, selectedUser, listingForIncomingMessage } = useMessageStore();
  const {authUser} = useAuthStore();
  useEffect(() => {
    getAllMessages();
    listingForIncomingMessage();
  }, [getAllMessages, listingForIncomingMessage]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <RightHead />

      {/* Message Section - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((messages) => 
            messages.senderId === authUser._id ? (

<div key={messages._id} className=" justify-end flex gap-3 items-center">
<div>
  <div className=" justify-end flex">
    <time className="text-xs opacity-50">{ messages.createdAt.split('T')[1].slice(0, 5)}</time>
  </div>
  <div className="chat-bubble bg-amber-200 text-black p-2 rounded-b-lg rounded-tl-lg max-w-[200px]">
    {messages.image && (
      <img src={messages.image} alt="Attachment" className="w-full rounded-md mb-2" />
    )}
    {messages.text && (
      <p>{messages.text}</p>
    )}
  </div>
</div>
<div className="chat-image avatar">
  <div className="w-10 rounded-full">
    <img
      alt="Tailwind CSS chat bubble component"
      src={authUser.image}
    />
  </div>
</div>
</div>
            ) : (

              <div key={messages._id} className=" justify-start flex gap-3 items-center">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={selectedUser.image}
                  />
                </div>
              </div>
              <div>
                <div>
                  <time className="text-xs opacity-50">{ messages.createdAt.split('T')[1].slice(0, 5)}</time>
                </div>
                <div className="chat-bubble bg-amber-200 text-black p-2 rounded-b-lg rounded-tr-lg max-w-[200px]">
                {messages.image && (
      <img src={messages.image} alt="Attachment" className="w-full rounded-md mb-2" />
    )}
    {messages.text && (
      <p>{messages.text}</p>
    )}
                </div>
              </div>
              </div>
            )
             
        )}
        
        
      </div>

      {/* Message Input */}
      <Send />
    </div>
  );
};

export default RightSide;
