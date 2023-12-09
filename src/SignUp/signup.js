import React from "react";
import "./signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

   const navigate = useNavigate();

  const postRegData = {
      fullName, emailAddress, password
  }

  const validateRegData = () => {
    const regex = /\d+/;
    if (regex.test(postRegData.fullName)) {
      alert("Numbers are not allowed in fullName fields");
      return false;
    }
  for (let key in postRegData){
    if(postRegData[key] === ""){
      alert(`${key} cannot be empty`)
      return false
    }
  }
  }

  const postData = (e) => {
    e.preventDefault();

    const valResult = validateRegData()
    if (valResult === false) return;
    Axios.post("https://sectorspace-production.up.railway.app/api/v1/user/sign-up", {
      "name": fullName,
      "email":emailAddress,
      "password":password,
    })
      .then((res) => {
        console.log(res)

        res.status === 200 && navigate("/sector", {state:{email:emailAddress}});
      })
      .catch((error) => {
       console.log(error);
      });
  };
  
  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
  });
  const validateInput = (field, value) => {
    switch (field) {
      case "fullName":
        if (value.length === 0) {
          setErrors((errors) => ({
            ...errors,
            fullName: "Full Name is required",
          }));
        } else {
          setErrors((errors) => ({ ...errors, fullName: "" }));
        }
        break;
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
    <div className="signup">
      <div className="signup_text">
        <h3>Welcome to our portal</h3>

        <form className="signup_form">
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              validateInput("fullName", e.target.value);
            }}
         
            placeholder="Fullname"
            required
          />
          <div className="email">{errors.fullName}</div>

          <input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              validateInput("emailAddress", e.target.value);
            }}
          
            placeholder="EmailAddress"
            required
          />
          <div className="email">{errors.emailAddress}</div>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateInput("password", e.target.value);
            }}
            
            placeholder="Password"
            required
          />
          <div className="pass">{errors.password}</div>

          <button className="btn" onClick={postData}>
            SignUp
          </button>
          <p>
            Already have an account?
            <Link to="/login">
              {" "}
              <span>Login Here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
  