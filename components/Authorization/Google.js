import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { google_logo } from "../../images";
import { useEffect } from "react";
import { GoogleOAuth } from "../../http/userApi";
import { USER_ACCOUNT_ROUTE } from "../../utils/consts";
import { useMedia } from "../../utils/use-media";
import { isMobile } from "../../utils";

 const clientId = "175140570001-gu5nmfhcttepqtrlbuqc8u28d7pjcf2t.apps.googleusercontent.com";
//const clientId = "347848844331-0ikavl7es1qpfh9vburjrqnr3v4ciglu.apps.googleusercontent.com";

function GoogleAuth() {
  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: "",
    //   });
    // }

    // gapi.load("client:auth2", start);
  });

  const responseGoogle = async (res) => {
    const data = await GoogleOAuth(
      res.profileObj.email,
      res.profileObj.googleId
    );
    if (data.id) window.location.href = USER_ACCOUNT_ROUTE;
  };

  let mobile = useMedia(isMobile);

  return (
    <div id="googleSignInButton" className="mx-auto">
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <button
            style={{
              height: mobile ? 60 : 100,
              width: mobile ? 60 : 100,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="border p-4 w-16 lg:p-8 lg:w-auto rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer"
          >
            <img
              height={mobile ? 24 : 40}
              width={mobile ? 24 : 40}
              src={google_logo}
            />
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleAuth;
