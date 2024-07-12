/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "../../App.css";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const clientId =
    "470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, [clientId]);
  const responseGoogle = async (e) => {
    console.log(e);
    setIsLoggedIn(true);
    try {
      const response = await fetch("http:localhost:5000/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  navigate("/app");

  return (
    <>
      <GoogleLogin
        clientId="470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default LoginPage;
