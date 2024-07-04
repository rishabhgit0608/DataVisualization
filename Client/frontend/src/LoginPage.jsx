import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "./App.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const responseGoogle = () => {
    navigate("/app");
  };

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
