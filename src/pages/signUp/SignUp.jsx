import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

export const SignUp = () => {
  const {
    showPassword: { signUp, signUpConfirm },
    toggleSignUpPassword,
    toggleSignUpConfirmPassword,
    signUpHandler,
  } = useAuth();

  const [userSignUpDetails, setUserSignUpDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInput = (e) =>
    setUserSignUpDetails({
      ...userSignUpDetails,
      [e.target.name]: e.target.value,
    });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    signUpHandler(userSignUpDetails);
  };

  return (
    <div className="signUp_page">
      <h2 className="signUp_heading">Sign Up</h2>
      <form onSubmit={handleSignUpSubmit}>
        <label>
          <h3>First Name</h3>{" "}
          <input
            className="signUp_input"
            placeholder="Seokjin"
            name="firstName"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <h3>Last Name</h3>{" "}
          <input
            className="signUp_input"
            placeholder="Kim"
            name="lastName"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <h3>Email</h3>{" "}
          <input
            type="email"
            className="signUp_input"
            placeholder="bts@loveyourself.com"
            name="email"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            type={signUp ? "text" : "password"}
            className="signUp_input"
            placeholder="*********"
            name="password"
            onChange={handleInput}
            required
          />
          <div
            className="signUp_btn_pwd"
            onClick={() => toggleSignUpPassword()}
          >
            {signUp ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </label>
        <label>
          <h3>Confirm Password</h3>
          <input
            type={signUpConfirm ? "text" : "password"}
            className="signUp_input"
            placeholder="*********"
            name="confirmPassword"
            onChange={handleInput}
            required
          />
          <div
            className="signUp_btn_pwd"
            onClick={() => toggleSignUpConfirmPassword()}
          >
            {signUpConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </label>
        <label className="signUp_label_accept">
          <input type="checkbox" required />
          <h3>I accept terms and conditions</h3>
        </label>
        <button type="submit" className="signUp_btn">
          <h3>Sign Up</h3>
        </button>
        <NavLink className="navlink" to="/login">
          <button className="signUp_btn_login">
            <h3>Already have an account? Login</h3>
            <ChevronRightIcon />
          </button>
        </NavLink>
      </form>
    </div>
  );
};
