import { useEffect } from "react";
import { DiscordOAuth, getDiscordUserInfo } from "../../http/userApi";
import { discord_logo } from "../../images";
import { isMobile } from "../../utils";
import { USER_ACCOUNT_ROUTE, USER_SETNAME_ROUTE } from "../../utils/consts";
import { useMedia } from "../../utils/use-media";

function getUrlParams(url) {
  let urlParams = url.split("&");
  let params = {};

  if (urlParams.length) {
    urlParams.map((e) => {
      let objKey = e.split("=")?.[0];
      params[objKey] = e.split("=")?.[1];
    });
  }
  return params;
}

function DiscordAuth() {
  useEffect(() => {
    handleDiscordLogin();
  }, []);

  const handleDiscordLogin = () => {
    const url = window.location.href;
    const params = getUrlParams(url);
    if (params?.access_token) {
      // GET ACCOUNT INFO FROM DISCORD
      getDiscordUserInfo(params?.access_token).then((response) => {
        if (response?.email) {
          // AUTH FLOW
          DiscordOAuth({
            id: response?.id,
            email: response?.email,
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
      });
    }
  };

  const loginDiscord = () => {
    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1072759047029260338&redirect_uri=https%3A%2F%2Flayer.page%2F&response_type=token&scope=identify%20email"
    );
    // window.open(
    //   "https://discord.com/api/oauth2/authorize?client_id=1072759047029260338&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&scope=identify%20email"
    // );
  };

  return (
    <button
      style={{
        height: useMedia(isMobile) ? 60 : 100,
        width: useMedia(isMobile) ? 60 : 100,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
      onClick={loginDiscord}
      className="border p-4 w-16 lg:p-8 lg:w-auto mx-auto rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer"
    >
      <img
        height={useMedia(isMobile) ? 24 : 40}
        width={useMedia(isMobile) ? 24 : 40}
        src={discord_logo}
      />
    </button>
  );
}

export default DiscordAuth;
