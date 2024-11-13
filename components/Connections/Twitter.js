import { getTwitterToken } from "../../http/userApi";
import ConnectedBox from "./ConnectedBox";

const TwitterConnection = ({ data, onRemove }) => {
  let isTwitterConnected = data?.findIndex((e) => e.service === "twitter");

  const onLogin = async () => {
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
    <ConnectedBox
      title={"Twitter"}
      isRemove={isTwitterConnected > -1 && data?.length > 1}
      onRemove={() => onRemove("twitter")}
      info={data[isTwitterConnected]}
    >
      {isTwitterConnected === -1 && (
        <button
          className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
          onClick={onLogin}
        >
          Add
        </button>
      )}
    </ConnectedBox>
    // <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between mb-2">
    //   <div className="border-b w-full max-w-[650px]">
    //     <p className="text-[#645F5B] p-2.5 dark:text-[#ffffff]">Twitter</p>
    //   </div>
    //   <div className="flex cursor-pointer">
    //     {isTwitterConnected === -1 && <img src={plus_svg} onClick={onLogin} />}

    //     {isTwitterConnected > -1 && data?.length > 1 && (
    //       <div
    //         onClick={() => onRemove("twitter")}
    //         className="flex items-center p-2.5 border border-[#EAEAEA] rounded cursor-pointer"
    //       >
    //         <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
    //           Remove
    //         </span>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default TwitterConnection;
