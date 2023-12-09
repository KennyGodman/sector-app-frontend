import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function LogIn() {
 

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

      
  const navigate = useNavigate();

  const postRegData = {
    email,
    password,
  };

   const validateRegData = () => {

     for (let key in postRegData) {
       if (postRegData[key] === "") {
         alert(`${key} cannot be empty`);
         return false;
       }
     }
   };


  const postLoginData = (e) => {
    e.preventDefault();
   const valResult = validateRegData();
   if (valResult === false) return;
    Axios.post( "https://sectorspace-production.up.railway.app/api/v1/user/login", {
      email,
      password,
    })
      .then((res) => {
        res.status === 200 && navigate("/sector", {state:{id:res.data.id}});
      })
      .catch((error) => {
      alert(error.message);
      });
 
  };
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "emailAddress":
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setErrors((errors) => ({
            ...errors,
            emailAddress: "Email Address is invalid",
          }));
        } else {
          setErrors((errors) => ({ ...errors, emailAddress: "" }));
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors((errors) => ({
            ...errors,
            password: "Password must be at least 8 characters",
          }));
        } else {
          setErrors((errors) => ({ ...errors, password: "" }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="login">
      <div className="login_text">
        <h3>Login to make your reservations</h3>

        <form className="login_form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              validateInput("emailAddress", e.target.value);
            }}
            placeholder="EmailAddress"
            required
          />
           <div className="emails">{errors.emailAddress}</div>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput("password", e.target.value);
            }}
            placeholder="Password"
            name="password"
            required
          />
          <div className="pass">{errors.password}</div>
          <button className="bt" onClick={postLoginData}>
            Log In
          </button>
          <p>
            Need an account?
            <span>
              <Link to="/signup">
                <span>SignUp</span>
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;