import React, { useContext, useEffect } from "react";
import RightNavbar from "../navbar/RightNavbar";
import SendMessage from "./SendMessage";
import FriendMessageDisplayed from "./FriendMessageDisplayed";
import YourMessageDisplayed from "./YourMessageDisplayed";
import { GlobalState } from "../context/GlobalContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const ChatDisplayed = () => {
  const {
    messageInput,
    setMessageInput,
    messagesId,
    messages,
    setMessages,
    userData,
    chatUser,
  } = useContext(GlobalState);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      if (messageInput && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: messageInput,
            createdAt: new Date(),
            type: "text",
          }),
        });

        setMessageInput("");

        const userIDs = [chatUser.rId, userData.id];
        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = messageInput.slice(
              0,
              30
            );
            userChatData.chatsData[chatIndex].updatedAt = Date.now();

            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "staychat_storage");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbn9nkjum/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        const imageUrl = data.secure_url;

        if (messagesId) {
          await updateDoc(doc(db, "messages", messagesId), {
            messages: arrayUnion({
              sId: userData.id,
              imageUrl,
              createdAt: new Date(),
              type: "image",
            }),
          });
        }
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error sending image:", error);
      toast.error("Failed to send image");
    }
  };

  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour > 12) {
      return hour - 12 + ":" + minute + " PM";
    } else {
      return hour + ":" + minute + " AM";
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        // setMessages([...res.data().messages].reverse());
        setMessages(res.data().messages || []);
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return (
    <>
      <div className="flex flex-col h-full">
        <RightNavbar />

        <section className="flex-1 max-h-[51vh] lg:max-h-[75vh] overflow-y-scroll no-scrollbar">
          {messages.map((message, index) => (
            <div key={index} className="px-[1rem] lg:px-[2rem] mt-[1rem]">
              {message.sId === userData.id ? (
                <YourMessageDisplayed
                  message={message}
                  convertTimestamp={convertTimestamp}
                />
              ) : (
                <FriendMessageDisplayed
                  message={message}
                  convertTimestamp={convertTimestamp}
                />
              )}
            </div>
          ))}
        </section>

        <SendMessage sendMessage={sendMessage} sendImage={sendImage} />
      </div>
    </>
  );
};

export default ChatDisplayed;
