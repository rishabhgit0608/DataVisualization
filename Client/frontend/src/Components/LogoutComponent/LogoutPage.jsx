/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "../../App.css";

export const LogoutPage = ({ setIsLoggedIn }) => {
  const clientId =
    "470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com";
  const navigate = useNavigate();
  navigate("/app");
  const logoutSuccess = () => {
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
      />
    </>
  );
};
