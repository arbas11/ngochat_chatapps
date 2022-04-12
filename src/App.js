import React, { useEffect, useState } from "react";
import "./App.scss";
import Nav from "./components/nav/Nav";
import io from "socket.io-client";
import ChatBody from "./components/chatBody/ChatBody";
import LoginForm from "./components/login/LoginForm";
import useUserAuth from "./hooks/useAuth";
import { baseUrl } from "./service/baseUrl";

const socketUrl = baseUrl;
function App() {
  const [userData, setUserData] = useState();
  const [socket, setSocket] = useState();
  const [contactSelected, setContactSelected] = useState(false);
  const { signInWithGoogle, token, isAuth, setIsAuth, userLogin } =
    useUserAuth();

  useEffect(() => {
    if (userLogin) {
      setUserData(userLogin);
    }
  }, [userLogin]);

  useEffect(() => {
    if (userLogin) {
      const userEmail = userLogin.userEmail;
      setSocket(
        io(socketUrl, {
          query: { userEmail },
        })
      );
    }
  }, [userLogin]);

  return (
    <div className="__main">
      {isAuth ? (
        <>
          <Nav setContactSelected={setContactSelected} />
          <ChatBody
            userData={userData}
            setUserData={setUserData}
            setIsAuth={setIsAuth}
            token={token}
            socket={socket}
            setSocket={setSocket}
            contactSelected={contactSelected}
            setContactSelected={setContactSelected}
          />
        </>
      ) : (
        <LoginForm signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
}

export default App;
