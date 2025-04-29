import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { GlobalState } from "../context/GlobalContext";

const SendMessage = ({ sendMessage, sendImage }) => {
  const { messageInput, setMessageInput } = useContext(GlobalState);

  return (
    <>
      <div className="fixed bottom-0 left-0 lg:pl-[565px] w-full h-[70px] lg:h-[105px] flex-between px-[1rem] lg:px-[2rem] shadow-2xl">
        <form onSubmit={sendMessage} className="flex-1">
          <input
            type="text"
            placeholder="Send a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="w-full text-black outline-0 placeholder:text-[#686769] dark:text-gray"
          />
        </form>

        <div className="flex gap-[2rem] bottom-0">
          <label
            htmlFor="avatar"
            className="cursor-pointer"
          >
            <img
              src={assets.gallery_icon}
              alt="Gallery Icon"
              className="w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] cursor-pointer dark:invert"
            />
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={sendImage}
            />
          </label>

          <img
            src={assets.send_button}
            alt="Send Icon"
            className="w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] opacity-[50%] cursor-pointer dark:invert"
            onClick={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default SendMessage;
