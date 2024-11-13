import { useEffect, useState } from "react";
import { deleteConnect } from "../../http/userApi";
import { check } from "../../images";

const GithubConnection = ({ data }) => {
  const [connectGithub, setConnectGithub] = useState(false);
  const [connectedAPI, setConnectedAPI] = useState(false);
  const [info, setInfo] = useState(null);

  const clientId = "278ebeee654546b331c5";

  useEffect(() => {
    // getConnections().then((data) => {
    //
    //   for (let info of data) {
    //     if (info.service === "github") {
    //       setInfo(info);
    //       setConnectGithub(true);
    //     }
    //   }
    // });

    for (let info of data) {
      if (info.service === "github") {
        setInfo(info);
        setConnectGithub(true);
      }
    }

    setConnectedAPI(data.length);
  }, [data]);

  const addGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        clientId +
        "&scope=user"
    );
  };

  const deleteGithub = async () => {
    const deleteThis = window.confirm("Unlink profile?");
    if (deleteThis) {
      const data = await deleteConnect("github");
      setConnectGithub(false);
    }
  };

  return (
    <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <p className="text-[#645F5B] dark:text-[#ffffff] font-bold text-sm">
          Github
        </p>
        <div className="flex cursor-pointer">
          {!connectGithub && (
            <button
              onClick={addGithub}
              className="bg-[#EAEAEA] h-[35px] w-[50px] rounded font-semibold text-sm text-[#589ED5] cursor-pointer"
            >
              Add
            </button>
          )}
          {connectGithub && (
            <>
              {connectedAPI > 1 && (
                <div
                  className="flex items-center border border-[#EAEAEA] rounded cursor-pointer h-[35px] w-[75px]  justify-center"
                  onClick={deleteGithub}
                >
                  <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
                    Remove
                  </span>
                </div>
              )}
              {connectedAPI <= 1 && (
                <div className="flex  items-center px-2.5 border border-[#EAEAEA] rounded cursor-not-allowed font-semibold	common-button h-[35px] w-[75px]  justify-center">
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

export default GithubConnection;
