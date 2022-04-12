import React from "react";
import Avatar from "../chatList/Avatar";

function ChatItem({
  animationDelay,
  userEmail,
  history,
  contactImage,
  contactName,
  userImage,
}) {
  return (
    <>
      {history.map((v, index) => (
        <div
          key={index}
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${v.author === userEmail ? "me" : "other"}`}
        >
          <div className="chat__item__content">
            <div className="chat__msg">{v.message}</div>
            <div className="chat__meta">
              <span>{v.time}</span>
              <span>{v.author === userEmail ? "you" : contactName}</span>
            </div>
          </div>
          <Avatar
            isOnline="active"
            image={v.author === userEmail ? userImage : contactImage}
          />
        </div>
      ))}
    </>
  );
}
export default ChatItem;
