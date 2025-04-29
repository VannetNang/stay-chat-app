import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { GlobalState } from "../../components/context/GlobalContext";
import LeftNavbar from "../../components/navbar/LeftNavbar";
import ChatDisplayed from "../../components/overlap/ChatDisplayed";
import ProfileDetail from "../../components/overlap/ProfileDetail";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const Home = () => {
  const {
    setOpenChat,
    openChat,
    setProfileDetail,
    profileDetail,
    welcomeChat,
    userData,
    chatData,
    setChatUser,
    setMessagesId,
  } = useContext(GlobalState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  async function handleSearchUser(e) {
    try {
      const input = e.target.value;

      if (input) {
        setShowDropdown(true);
        const userRef = collection(db, "users");
        const queue = query(
          userRef,
          where("username", "==", input.toLowerCase())
        );
        const result = await getDocs(queue);

        if (!result.empty && result.docs[0].data().id !== userData.id) {
          const userExist = chatData.some(
            (user) => user.rId === result.docs[0].data().id
          );

          if (!userExist) {
            setUser(result.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowDropdown(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addUser = async () => {
    const messageRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messageRef);

      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error) {
      console.error(error);
      toast.error(error.code);
    }
  };

  const setChat = async (chat) => {
    setMessagesId(chat.messageId);
    setChatUser(chat);
    setProfileDetail(false);
    setOpenChat(true);
  };

  return (
    <div className="flex min-h-screen dark:bg-black">
      <div className="w-full lg:w-[540px] shadow-xl">
        <LeftNavbar />

        <div className="flex-center px-[1rem] lg:px-[2rem] mt-[1rem] mb-[2rem]">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={handleSearchUser}
            className="h-[50px] lg:h-[60px] w-[470px] pl-[1rem] regular-mobile lg:regular rounded-lg outline-0 bg-dark-gray"
          />

          <div className="flex-center cursor-pointer">
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="absolute invert ml-[-3.5rem] w-[20px] lg:w-[25px]"
            />
          </div>
        </div>

        {showDropdown && user ? (
          <div className="flex mr-[1rem] shadow-xl pb-[1.5rem] lg:pb-0 lg:shadow-none lg:flex-col gap-[3rem] lg:gap-[20px] overflow-x-scroll max-w-[100vw] lg:overflow-y-scroll no-scrollbar lg:max-h-[73vh]">
            <div
              className="px-[1rem] lg:px-[2rem] flex items-center gap-[10px] lg:gap-[22px] cursor-pointer"
              onClick={addUser}
            >
              <img
                src={user.avatar}
                alt="Avatar Icon"
                className="logo-rounded-mobile lg:logo-rounded"
              />

              <div className="flex flex-col">
                <div className="dark:text-gray regular-mobile lg:heading-mobile w-[100px] lg:w-full text-ellipsis overflow-hidden">
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex mr-[1rem] shadow-xl pb-[1.5rem] lg:pb-0 lg:shadow-none lg:flex-col gap-[3rem] lg:gap-[20px] overflow-x-scroll max-w-[100vw] lg:overflow-y-scroll no-scrollbar lg:max-h-[73vh]">
            {chatData.map((chat, index) => (
              <div
                key={index}
                className="px-[1rem] lg:px-[2rem] flex items-center gap-[10px] lg:gap-[22px] cursor-pointer"
                onClick={() => setChat(chat)}
              >
                <img
                  src={chat.userData.avatar}
                  alt="Avatar Icon"
                  className="logo-rounded-mobile lg:logo-rounded"
                />
                <div className="flex flex-col dark:text-gray">
                  <div className="regular-mobile text-[14px] lg:text-[20px] lg:heading-mobile w-[100px] lg:w-full text-ellipsis overflow-hidden">
                    {chat.userData.name}
                  </div>
                  <div className="text-[12px] w-[100px] lg:w-full text-ellipsis overflow-hidden lg:text-[1rem] text-gray-500">
                    {chat.lastMessage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="lg:hidden">
          {profileDetail && <ProfileDetail />}

          {openChat && <ChatDisplayed />}
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        {profileDetail && <ProfileDetail />}

        {openChat ? (
          <div className="regular flex-1 min-h-screen">
            <ChatDisplayed />
          </div>
        ) : (
          welcomeChat && (
            <p className="regular flex-center min-h-screen dark:text-gray">
              Select a chat to start messaging
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
