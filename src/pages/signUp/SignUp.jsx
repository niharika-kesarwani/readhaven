import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const SignUp = () => {
  const {
    showPassword: { signUp, signUpConfirm },
    toggleSignUpPassword,
    toggleSignUpConfirmPassword,
  } = useLogin();

  return (
    <div className="signUp_page">
      <h2 className="signUp_heading">Sign Up</h2>
      <label>
        <h3>First Name</h3>{" "}
        <input className="signUp_input" placeholder="Seokjin" />
      </label>
      <label>
        <h3>Last Name</h3> <input className="signUp_input" placeholder="Kim" />
      </label>
      <label>
        <h3>Email</h3>{" "}
        <input
          type="email"
          className="signUp_input"
          placeholder="bts@loveyourself.com"
        />
      </label>
      <label>
        <h3>Password</h3>
        <input
          type={signUp ? "text" : "password"}
          className="signUp_input"
          placeholder="*********"
        />
        <button
          className="signUp_btn_pwd"
          onClick={() => toggleSignUpPassword()}
        >
          {signUp ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </label>
      <label>
        <h3>Confirm Password</h3>
        <input
          type={signUpConfirm ? "text" : "password"}
          className="signUp_input"
          placeholder="*********"
        />
        <button
          className="signUp_btn_pwd"
          onClick={() => toggleSignUpConfirmPassword()}
        >
          {signUpConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </label>
      <label className="signUp_label_accept">
        <input type="checkbox" />
        <h3>I accept terms and conditions</h3>
      </label>
      <button className="signUp_btn">
        <h3>Sign Up</h3>
      </button>
      <NavLink className="navlink" to="/login">
        <button className="signUp_btn_login">
          <h3>Already have an account? Login</h3>
          <ChevronRightIcon />
        </button>
      </NavLink>
    </div>
  );
};
