import { useEffect } from "react";
import { toast } from "react-toastify";
import { DiscordConnect, getDiscordUserInfo } from "../../http/userApi";
import { check } from "../../images";
import { getUrlParams } from "../../utils";
import ConnectedBox from "./ConnectedBox";

const DiscordConnection = ({ data, successCallBack, onRemove }) => {
  let isDiscordConnected = data?.findIndex((e) => e.service === "discord");

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
          DiscordConnect({
            id: response?.id,
            email: response?.email,
          }).then((data) => {
            console.log("discord connect data>>>", data);
            if (data.status === 0) {
              toast(data?.message);
              return;
            }
            successCallBack();
          });
        }
      });
    }
  };

  const onLogin = () => {
    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1072759047029260338&redirect_uri=https%3A%2F%2Flayer.page%2Faccount%2Fsettings&response_type=token&scope=identify%20email"
    );
  };

  return (
    <ConnectedBox
      title={"Discord"}
      isRemove={isDiscordConnected > -1 && data?.length > 1}
      onRemove={() => onRemove("discord")}
      info={data[isDiscordConnected]}
    >
      {isDiscordConnected === -1 && (
        <button
          className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
          onClick={onLogin}
        >
          Add
        </button>
      )}
    </ConnectedBox>
    // <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between mb-2">
    //   <div className="flex flex-row justify-between">
    //     <p className="text-[#645F5B] dark:text-[#ffffff] font-bold text-sm">
    //       Discord
    //     </p>

    //     <div className="flex cursor-pointer">
    //       {isDiscordConnected === -1 && (
    //         <button
    //           className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
    //           onClick={onLogin}
    //         >
    //           Add
    //         </button>
    //       )}

    //       {isDiscordConnected > -1 && data?.length > 1 && (
    //         <div
    //           onClick={() => onRemove("discord")}
    //           className="flex items-center p-2.5 border border-[#EAEAEA] rounded cursor-pointer"
    //         >
    //           <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
    //             Remove
    //           </span>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="flex flex-row justify-between">
    //     <p className="text-[#645F5B] dark:text-[#ffffff] text-sm">email</p>
    //     <img height={20} width={20} src={check} />
    //   </div>
    // </div>
  );
};

export default DiscordConnection;
