import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { deleteConnect, GoogleConnect } from "../../http/userApi";
import { check } from "../../images";

const GoogleConnection = ({ data }) => {
  const [connectGoogle, setConnectGoogle] = useState(false);
  const [connectedAPI, setConnectedAPI] = useState(false);
  const [info, setInfo] = useState(null);
  const clientId =
    "175140570001-dj25gi29kfap835f9ll1429qpru28a4r.apps.googleusercontent.com";

  useEffect(() => {
    // getConnections().then((data) => {
    //
    //   for (let info of data) {
    //     if (info.service === "google") {
    //       setInfo(info);
    //       setConnectGoogle(true);
    //     }
    //   }
    // });

    setConnectedAPI(data.length);

    for (let info of data) {
      if (info.service === "google") {
        setInfo(info);
        setConnectGoogle(true);
      }
    }
  }, [data]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const addGoogle = async (res) => {
    const data = await GoogleConnect(
      res.profileObj.email,
      res.profileObj.googleId
    );
    if (data.status === 1) setConnectGoogle(true);
  };

  const deleteGoogle = async () => {
    const deleteThis = window.confirm("Unlink profile?");
    if (deleteThis) {
      const data = await deleteConnect("google");
      setConnectGoogle(false);
    }
  };

  return (
    <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <p className="text-[#645F5B] dark:text-[#ffffff] font-bold text-sm">
          Google
        </p>
        <div className="flex cursor-pointer">
          {!connectGoogle && (
            <div id="googleSignInButton" className="mx-auto">
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <button
                    className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Add
                  </button>
                )}
                onSuccess={addGoogle}
                onFailure={addGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          )}
          {connectGoogle && (
            <>
              {connectedAPI > 1 && (
                <div
                  className="flex items-center h-[35px] w-[75px] border border-[#EAEAEA] rounded cursor-pointer"
                  onClick={deleteGoogle}
                >
                  <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
                    Remove
                  </span>
                </div>
              )}
              {connectedAPI <= 1 && (
                <div className="flex items-center h-[35px] w-[75px] border border-[#EAEAEA] rounded cursor-not-allowed font-semibold	common-button">
                  <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
                    Remove
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {info && (
        <div className="flex flex-row justify-between">
          <span className="text-[#645F5B] dark:text-[#ffffff] text-sm truncate block">
            {info?.email}
          </span>
          <img height={20} width={20} src={check} />
        </div>
      )}
    </div>
  );
};

export default GoogleConnection;
