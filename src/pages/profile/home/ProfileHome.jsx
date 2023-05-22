import "./ProfileHome.css";
import { users } from "../../../backend/db/users";

export const ProfileHome = () => {
  const { firstName, lastName, email } = users[0];

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
