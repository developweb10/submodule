import { useEffect, useState } from "react";
import AppleSignin from "react-apple-signin-auth";
import { AppleConnect } from "../../http/userApi";
import { check } from "../../images";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import ConnectedBox from "./ConnectedBox";

const AppleConnection = ({ data, successCallBack, onRemove }) => {
  let isAppleConnected = data?.findIndex((e) => e.service === "apple");

  const onSuccess = (response) => {
    if (response?.authorization) {
      let appleInfo = jwt_decode(response?.authorization?.id_token);

      if (!appleInfo?.email) {
        toast(
          "Please use another email id or Enable email for account connection from apple.",
          { type: "error" }
        );
        return;
      }

      AppleConnect({
        code: response?.authorization?.id_token,
      }).then((data) => {
        if (data.status === 0) {
          toast(data?.message);
          return;
        }
        successCallBack();
      });
    }
  };

  const renderAppleButton = () => {
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
            className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
            {...props}
          >
            Add
          </button>
        )}
      />
    );
  };

  return (
    <ConnectedBox
      title={"Apple"}
      isRemove={isAppleConnected > -1 && data?.length > 1}
      onRemove={() => onRemove("apple")}
      info={data[isAppleConnected]}
    >
      {isAppleConnected === -1 && renderAppleButton()}
    </ConnectedBox>
    // <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between">
    //   <div className="flex flex-row justify-between">
    //     <p className="text-[#645F5B] dark:text-[#ffffff] font-bold text-sm">
    //       Apple
    //     </p>

    //     <div className="flex cursor-pointer">
    //       {isAppleConnected === -1 && renderAppleButton()}

    //       {isAppleConnected > -1 && data?.length > 1 && (
    //         <div
    //           onClick={() => onRemove("apple")}
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

export default AppleConnection;
