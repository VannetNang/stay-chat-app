import { onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const GlobalState = createContext(null);

const GlobalContext = ({ children }) => {
  const [openChat, setOpenChat] = useState(false);
  const [profileDetail, setProfileDetail] = useState(false);
  const [welcomeChat, setWelcomeChat] = useState(true);
  const [menuClicked, setMenuClicked] = useState(false);
  const [imageAvatar, setImageAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [chatData, setChatData] = useState([]);
  const [messagesId, setMessagesId] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  function toggleDarkMode() {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userInfo = (await getDoc(userRef)).data();
      setUserData(userInfo);

      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });

      setInterval(async () => {
        if (auth.chatUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);

      const unSub = onSnapshot(chatRef, async (res) => {
        if (res.exists()) {
          const chatItems = res.data().chatsData;
          const tempData = [];

          for (const chatItem of chatItems) {
            const userRef = doc(db, "users", chatItem.rId);
            const user = await getDoc(userRef);
            const userData = user.data();
            tempData.push({ ...chatItem, userData });
          }

          setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        } else {
          setChatData([]);
        }
      });

      return () => {
        unSub();
      };
    }
  }, [userData]);

  return (
    <GlobalState.Provider
      value={{
        openChat,
        setOpenChat,
        profileDetail,
        setProfileDetail,
        welcomeChat,
        setWelcomeChat,
        menuClicked,
        setMenuClicked,
        imageAvatar,
        setImageAvatar,
        loadUserData,
        userData,
        loading,
        setLoading,
        chatData,
        messagesId,
        setMessagesId,
        messages,
        setMessages,
        chatUser,
        setChatUser,
        messageInput,
        setMessageInput,
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalContext;
