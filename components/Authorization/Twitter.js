import { getTwitterToken } from "../../http/userApi";
import { twitter_logo } from "../../images";
import { isMobile } from "../../utils";
import { useMedia } from "../../utils/use-media";

function TwitterAuth() {
  const onClick = async () => {
    try {
      const response = await getTwitterToken();
      if (response?.status == 1) {
        let url = `https://api.twitter.com/oauth/authorize?oauth_token=${response.response.oauth_token}&oauth_token_secret=${response.response.oauth_token_secret}&oauth_callback_confirmed=true`;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.log("error", error);
    }
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
      onClick={onClick}
      className="border p-4 w-16 lg:p-8 lg:w-auto mx-auto rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer"
    >
      <img
        height={useMedia(isMobile) ? 24 : 40}
        width={useMedia(isMobile) ? 24 : 40}
        src={twitter_logo}
      />
    </button>
  );
}

export default TwitterAuth;
