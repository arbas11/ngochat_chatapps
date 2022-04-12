import React, { useState } from "react";
import "./chatBody.scss";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

function ChatBody({
  userData,
  setUserData,
  setIsAuth,
  token,
  socket,
  setSocket,
  contactSelected,
  setContactSelected,
}) {
  const [selectedContact, setSelectedContact] = useState({});

  return (
    <div className="main__chatbody">
      <ChatList
        token={token}
        userEmail={userData.userEmail}
        contactSelected={contactSelected}
        setSelectedContact={setSelectedContact}
        setContactSelected={setContactSelected}
      />
      <ChatContent
        token={token}
        userData={userData}
        userEmail={userData.userEmail}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        contactSelected={contactSelected}
        socket={socket}
      />
      <UserProfile
        token={token}
        userEmail={userData.userEmail}
        userData={userData}
        setUserData={setUserData}
        setIsAuth={setIsAuth}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        contactSelected={contactSelected}
        setContactSelected={setContactSelected}
      />
    </div>
  );
}
export default ChatBody;
