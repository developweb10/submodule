import ReactModal from "react-modal";
import { ThemeContext, themes } from "../store/ThemeContext";
import AppleAuth from "./Authorization/Apple";
import DiscordAuth from "./Authorization/Discord";
import GithubAuth from "./Authorization/Github";
import GoogleAuth from "./Authorization/Google";
import TwitterAuth from "./Authorization/Twitter";
import { dark, logo, layerlogo, sun, close, searchIcon, menu } from "../images/index";
import { useLocation, useNavigate } from "react-router-dom";
import { SEARCH_USER } from "../utils/consts";
import { useState } from "react";
import { isMobile } from "../utils";
import { useMedia } from "../utils/use-media";

const AccountsMenu = ({ isOpen, onRequestClose, onMenu }) => {
  const mobile = useMedia(isMobile);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme-color") === "white-content" ? false : true
  );
  const [searchValue, setSearchValue] = useState("");

  const searchUser = (e) => {
    e.preventDefault();
    navigate(SEARCH_USER + searchValue.toLowerCase());
    navigate(0);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={300}
      overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]"
      className="fixed bottom-0 w-full h-full bg-white dark:bg-[#1A1919] pb-5 outline-none"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between border-b border-EA">
          <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
            <img src={layerlogo} className="p-2.5 h-14 cursor-pointer" />
          </div>
          <div className="flex border-EA w-40">
            <div
              className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40"
              onClick={onRequestClose}
            >
              <img height={30} width={30} src={close} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full overflow-hidden">
          {mobile ? (
            <div className="flex flex-col mt-[50px] space-y-5 h-[calc(100% - 250px)] overflow-y-scroll">
              <DiscordAuth />
              <AppleAuth />
              <TwitterAuth />
              <GithubAuth />
              <GoogleAuth />
            </div>
          ) : (
            <div className="flex flex-row items-center h-full w-[40%] m-auto gap-x-[10px]">
              <DiscordAuth />
              <AppleAuth />
              <TwitterAuth />
              <GithubAuth />
              <GoogleAuth />
            </div>
          )}

          <div className="flex justify-between px-5">
            <div
              onClick={() => {
                onMenu && onMenu();
              }}
            >
              <img height={35} width={35} src={menu} />
            </div>

            {!pathname.includes(SEARCH_USER) && (
              <form className="relative block w-8/12" onSubmit={searchUser}>
                <input
                  className="placeholder:text-[#67743D] bg-transparent block w-full border border-[#67743D] dark:text-[#FFFFFF] dark:placeholder-[#FFFFFF] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs"
                  placeholder="@user"
                  type="text"
                  name="search"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <img height={25} width={25} src={searchIcon} />
                </button>
              </form>
            )}

            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <button
                  className="h-[35px] w-[35px] rounded bg-[#EAEAEA] flex justify-center items-center"
                  color="link"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                  }}
                >
                  <img height={15} width={15} src={darkMode ? dark : sun} />
                </button>
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default AccountsMenu;
