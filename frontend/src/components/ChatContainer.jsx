import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from "./ChatHeader";
import MessageSkeleton from './skeletons/MessageSkeleton'
import MessageInput from "./MessageInput";

const ChatContainer = () => {

    const {messages,getMessages,isMessageLoading,selectedUser, subscribeToMessages, unsubscribeFromMessages}=useChatStore();
    const {authUser} = useAuthStore();
    
    const messageEndRef = useRef(null);

    useEffect(()=>{
        getMessages(selectedUser._id);

        subscribeToMessages()
        return () => unsubscribeFromMessages();
    },[selectedUser._id,getMessages, subscribeToMessages, unsubscribeFromMessages])

    useEffect(()=>{
        if(messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({behavior: "smooth"})
        }
    },[messages])

    if (isMessageLoading) {
        return (
        <div className="chat-container">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
        );
    }

    return(
        <div className="chat-container">
            <ChatHeader/>




            <div className="messages-area">
              <div className="space-y-4">
              
  {messages.map((message) => (
    <div
      key={message._id}
      className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
      ref={messageEndRef}
    >
      {/* Avatar Section */}
              <time className="text-xs opacity-50 ml-1">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>


        
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border border-base-300">
          <img
            src={
              message.senderId === authUser._id
                ? authUser.profilePic || "/dimg.jpg"
                : selectedUser.profilePic || "/dimg.jpg"
            }
            alt="profile"
          />
        </div>
      </div>

      <div className={`chat-bubble flex flex-col gap-2 ${message.senderId === authUser._id ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>

    
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-1"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>

    </div>
  ))}
  <div ref={messageEndRef} />
  </div>
</div>

            <MessageInput />
        </div>
    )

}

export default ChatContainer
