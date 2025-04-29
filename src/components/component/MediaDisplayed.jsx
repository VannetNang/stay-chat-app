import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../context/GlobalContext";

const MediaDisplayed = () => {
  const { messages } = useContext(GlobalState);
  const [msgURL, setMsgURL] = useState("");

  useEffect(() => {
    let tempImg = [];
    messages.map((message) => {
      if (message.imageUrl) {
        tempImg.push(message.imageUrl);
      }
    });
    setMsgURL(tempImg);
  }, [messages]);
  console.log(msgURL);

  return (
    <>
      <div className="max-h-[27.9vh] lg:max-h-[46vh] lg:overflow-y-scroll no-scrollbar">
        <div className="h-[40px] flex-center lg:h-[50px] w-full heading-mobile lg:heading bg-purple text-gray">
          Media
        </div>

        <div className="grid grid-cols-5 lg:grid-cols-7">
          {msgURL &&
            msgURL.map((url, index) => (
              <img
                key={index}
                src={url}
                onClick={() => window.open(url)}
                className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MediaDisplayed;
