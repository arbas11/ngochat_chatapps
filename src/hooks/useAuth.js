import { useEffect, useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { baseUrl } from "../service/baseUrl";

const LOGINURL = baseUrl + "api/login";

const firebaseConfig = {
  apiKey: "AIzaSyAPEpsysthLki6lxiyiGoBp1a3d9o3toj8",
  authDomain: "ngochat-1e901.firebaseapp.com",
  projectId: "ngochat-1e901",
  storageBucket: "ngochat-1e901.appspot.com",
  messagingSenderId: "1025377367964",
  appId: "1:1025377367964:web:36595f01a54bc212143a59",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export default function useUserAuth() {
  const [userLogin, setUserLogin] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  const reqUser = async (userEmail, displayName, profilePic, token) => {
    try {
      const res = await axios.post(
        LOGINURL,
        {
          userEmail: userEmail,
          displayName: displayName,
          profilePic: profilePic,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setUserLogin(res.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, displayName, photoURL } = userCred;
        userCred.getIdToken().then((token) => {
          setToken(token);
          if (token) {
          }
          reqUser(email, displayName, photoURL, token);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (userLogin) {
      if (userLogin.message) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    }
  }, [userLogin]);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  };

  return {
    signInWithGoogle,
    token,
    isAuth,
    setIsAuth,
    userLogin,
  };
}
