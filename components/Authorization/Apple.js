import { appleLogo } from "../../images";
import { isMobile } from "../../utils";
import { useMedia } from "../../utils/use-media";
import AppleSignin from "react-apple-signin-auth";
import { AppleOAuth } from "../../http/userApi";
import { USER_ACCOUNT_ROUTE, USER_SETNAME_ROUTE } from "../../utils/consts";

function AppleAuth() {
  let mobile = useMedia(isMobile);

  const onSuccess = (response) => {
    if (response?.authorization) {
      AppleOAuth({
        code: response?.authorization?.id_token,
      }).then((data) => {
        if (data?.id) {
          if (!data?.username) {
            window.location.href = USER_SETNAME_ROUTE;
          } else {
            window.location.href = USER_ACCOUNT_ROUTE;
          }
        }
      });
    }
  };

  return (
    <AppleSignin
      /** Auth options passed to AppleID.auth.init() */
      authOptions={{
        /** Client ID - eg: 'com.example.com' */
        clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
        /** Requested scopes, seperated by spaces - eg: 'email name' */
        scope: "email name",
        /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
        redirectURI: process.env.REACT_APP_REDIRECT_URI,
        /** State string that is returned with the apple response */
        state: "state",
        /** Nonce */
        nonce: "nonce",
        /** Uses popup auth instead of redirection */
        usePopup: true,
      }} // REQUIRED
      onSuccess={onSuccess} // default = undefined
      /** Called upon signin error */
      onError={(error) => console.log("error>>", error)} // default = undefined
      render={(props) => (
        <button
          style={{
            height: mobile ? 60 : 100,
            width: mobile ? 60 : 100,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          {...props}
          className="border p-4 w-16 lg:p-8 lg:w-auto mx-auto rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer"
        >
          <img
            height={mobile ? 24 : 40}
            width={mobile ? 24 : 40}
            src={appleLogo}
          />
        </button>
      )}
    />
  );
}

export default AppleAuth;
