import React from "react";
import logo from "./../../images/dibimbing.png";


function LoginForm({signInWithGoogle}) {
  return (
    <div className="outer-login">
      <div className="login-body">
        <div className="login-form">
          <p className="login-text">
            <img src={logo} alt="logo dibimbing" className="logo-login"></img>
          </p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
