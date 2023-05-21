import "./Login.css";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Login = () => {
  const {
    showPassword: { login },
    toggleLoginPassword,
  } = useLogin();

  return (
    <div className="login_page">
      <h2 className="login_heading">Login</h2>
      <label>
        <h3>Email</h3>{" "}
        <input
          type="email"
          className="login_input"
          placeholder="bts@loveyourself.com"
        />
      </label>
      <label>
        <h3>Password</h3>
        <input
          type={login ? "text" : "password"}
          className="login_input"
          placeholder="********"
        />
        <button className="login_btn_pwd" onClick={() => toggleLoginPassword()}>
          {login ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </label>
      <label className="login_label_remember">
        <input type="checkbox" />
        <h3>Remember Me</h3>
      </label>
      <button className="login_btn login_btn_login">
        <h3>Login</h3>
      </button>
      <button className="login_btn login_btn_test">
        <h3>Login with Test Credentials</h3>
      </button>
      <NavLink className="navlink" to="/signup">
        <button className="login_btn_new_acc">
          <h3>Create a new account</h3>
          <ChevronRightIcon />
        </button>
      </NavLink>
    </div>
  );
};
