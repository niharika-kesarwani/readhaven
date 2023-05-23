import "./ProfileHome.css";
import { useAuth } from "../../../index";

export const ProfileHome = () => {
  const { currentUser } = useAuth();
  const { firstName, lastName, email } = currentUser;

  return (
    <div className="profileHome_page">
      <div>
        <h2>Full Name:</h2>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div>
        <h2>Email:</h2>
        <h3>{email}</h3>
      </div>
    </div>
  );
};
