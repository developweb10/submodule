import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  account_arrow_svg,
  avatar_svg,
  blank_page_svg,
  close,
  dark,
  lockIcon,
  logo,
  layerlogo,
  searchIcon,
  sun,
} from "../images";
import {
  DOCS_ROUTE,
  FEATURES_ROUTE,
  HELP_ROUTE,
  HOME_ROUTE,
  SEARCH_USER,
  USER_ACCOUNT_ROUTE,
  USER_SETNAME_ROUTE,
  USER_SETTINGS_ROUTE,
} from "../utils/consts";
import { ThemeContext, themes } from "../store/ThemeContext";
import { Context } from "../index";
import { toast } from "react-toastify";
import AccountsMenu from "./AccountsMenu";

ReactModal.setAppElement("#root");

const Header = forwardRef((props, ref) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showModalMenu, setShowModalMenu] = useState(false);
  const [showModalAccounts, setShowModalAccounts] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme-color") === "white-content" ? false : true
  );

  const callBack = () => {
    setShowModalAccounts(true);
  };
  useImperativeHandle(ref, () => ({
    callBack: callBack,
  }));

  const searchUser = (e) => {
    e.preventDefault();
    navigate(SEARCH_USER + searchValue.toLowerCase());
    navigate(0);
  };

  const logOut = () => {
    user.setUser({});
    localStorage.removeItem("token");
    window.location.href = HOME_ROUTE;
  };

  if (
    user._user.username === "" &&
    window.location.pathname !== USER_SETNAME_ROUTE
  ) {
    window.location.href = USER_SETNAME_ROUTE;
  }

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      showModalMenu || showModalAccounts ? "hidden" : "auto";
  }, [showModalMenu, showModalAccounts]);

  return (
    <>
      <div className="flex justify-between lg:border-b border-EA">
        <div className="flex justify-between border-b border-EA lg:border-none w-full bg-white dark:bg-[#1A1919]">
          <img
            src={layerlogo}
            className="p-2.5 h-14 cursor-pointer"
            alt="Layer.Page logo"
            onClick={() => navigate(HOME_ROUTE)}
          />
          <div className="hidden lg:flex space-x-5 items-center p-2.5">
            <span
              className={`py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm common-button ${
                pathname == FEATURES_ROUTE ? "bg-[#E8E7E366]" : ""
              }`}
              onClick={() => navigate(FEATURES_ROUTE)}
            >
              Features
            </span>
            <a href="https://layer.guide/support" target="_blank">
              <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm common-button">
                Support
              </span>
            </a>

            <a href="https://layer.guide" target="_blank">
              <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm common-button">
                Guide
              </span>
            </a>
          </div>
        </div>
        <div className="flex lg:bg-side border-b lg:border-none lg:border-l border-EA w-40">
          <div
            className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40"
            onClick={() => setShowModalMenu(true)}
          >
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={showModalMenu}
        onRequestClose={() => setShowModalMenu(false)}
        closeTimeoutMS={300}
        overlayClassName="fixed flex-col top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]"
        className="fixed bottom-0 w-full h-full bg-[#FAF4EE] outline-none pb-[20px]"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col overflow-y-scroll no-scrollbar">
            <div className="flex justify-between border-b border-EA">
              <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
                <img
                  src={layerlogo}
                  className="p-2.5 h-14 cursor-pointer"
                  alt="Layer.Page logo"
                  onClick={() => {
                    navigate(HOME_ROUTE);
                    setShowModalMenu(false);
                  }}
                />
              </div>
              <div className="flex border-EA w-40 bg-white dark:bg-[#1A1919]">
                <div
                  className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40"
                  onClick={() => setShowModalMenu(false)}
                >
                  <img height={30} width={30} src={close} />
                </div>
              </div>
            </div>
            {!user.isAuth && (
              <div className="flex flex-col space-y-5 px-5 mt-5">
                <span
                  className="py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button w-full lg:w-[400px] self-center"
                  onClick={() => navigate(FEATURES_ROUTE)}
                >
                  Features
                </span>
                <span
                  className="py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button w-full lg:w-[400px] self-center"
                  onClick={() => navigate(HELP_ROUTE)}
                >
                  Support
                </span>
                <span
                  className="py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button w-full lg:w-[400px] self-center"
                  onClick={() => navigate(DOCS_ROUTE)}
                >
                  Guide
                </span>
              </div>
            )}

            {user.isAuth && (
              <div className="flex flex-col space-y-5 px-5 mt-5 w-full lg:w-2/4 self-center">
                <span
                  className={`py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button ${
                    pathname == FEATURES_ROUTE ? "bg-[#EAEAEA]" : ""
                  }`}
                  onClick={() => navigate(FEATURES_ROUTE)}
                >
                  Features
                </span>
                <span
                  className="py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button"
                  onClick={() => navigate(HELP_ROUTE)}
                >
                  Support
                </span>
                <span
                  className="py-2 px-7 border border-EA hover:bg-[#EAEAEA] duration-300 ease-in-out rounded cursor-pointer text-[#645F5B] font-semibold text-sm common-button"
                  onClick={() => navigate(DOCS_ROUTE)}
                >
                  Guide
                </span>
                <div className="border-b border-EA"></div>
                <div className="bg-white rounded p-2.5">
                  <div className="flex justify-between">
                    <span
                    className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://layer.page/${user?.user?.username}`
                        );
                        toast("Copied");
                      }}
                    >
                      <img src={blank_page_svg} alt="Blank page icon" />
                    </span>
                    <span>
                      <img
                        className="user-img-icon rounded-full"
                        src={user?.avatar || avatar_svg}
                      />
                    </span>
                  </div>

                  <span className="text-[#645F5B] font-regular text-[12px]">
                    @{user?.user?.username}
                  </span>
                </div>
                <button
                  className={`border border-EA rounded font-semibold common-button text-[#645F5B] text-sm hover:bg-[#EAEAEA] ${
                    pathname == USER_ACCOUNT_ROUTE ? "bg-[#EAEAEA]" : ""
                  }`}
                  onClick={() => navigate(USER_ACCOUNT_ROUTE)}
                >
                  Layer
                </button>
                <button
                  className={`border border-EA rounded py-2 font-semibold common-button text-[#645F5B] text-sm hover:bg-[#EAEAEA] ${
                    pathname == USER_SETTINGS_ROUTE ? "bg-[#EAEAEA]" : ""
                  }`}
                  onClick={() => navigate(USER_SETTINGS_ROUTE)}
                >
                  Settings
                </button>
                <button
                  className="border border-[#EAC5C3] rounded py-2 text-[#E1655C] font-semibold common-button text-sm hover:bg-[#EAC5C326]"
                  onClick={logOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between px-5 mt-[15px]">
            {user.isAuth && (
              <button
                onClick={() => {
                  setShowModalMenu(false);
                  navigate(USER_ACCOUNT_ROUTE);
                }}
                style={{ height: 35, width: 35 }}
                className="flex items-center justify-center p-2.5 bg-[#eaeaeb66] hover:bg-[#eaeaebe6] rounded-lg "
              >
                <img
                  src={account_arrow_svg}
                  alt="account arrow icon"
                  className="box-theme-icon"
                />
              </button>
            )}

            {!user.isAuth && (
              <div>
                <img
                  onClick={() => {
                    setShowModalAccounts(true);
                    setTimeout(() => {
                      setShowModalMenu(false);
                    }, 300);
                  }}
                  className="visible cursor-pointer hover:bg-[#eaeaeb80] rounded"
                  height={35}
                  width={35}
                  src={lockIcon}
                />
              </div>
            )}
            <form
              className="relative block mx-5 lg:right-[5px] w-full lg:w-[400px]"
              onSubmit={searchUser}
            >
              <input
                className="placeholder:text-[#67743D] bg-transparent block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 outline-none hover:border-[#525D30] focus:border-[#2D341A] text-xs"
                placeholder="@user"
                type="text"
                name="search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-1.5"
              >
                <img
                  className={searchValue?.length ? "bg-[#67743D] rounded" : ""}
                  height={25}
                  width={25}
                  src={searchIcon}
                  alt="search logo"
                />
              </button>
            </form>
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <button
                  style={{ height: 35, width: 35 }}
                  color="link"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                    window.dispatchEvent(new Event("theme-color"));
                  }}
                  className="flex items-center justify-center p-1.5 bg-[#eaeaeb80] hover:bg-[#eaeaebe6] rounded-lg"
                >
                  <img
                    src={darkMode ? dark : sun}
                    className="box-theme-icon"
                    alt="Theme mode icon"
                  />
                </button>
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
      </ReactModal>

      <AccountsMenu
        isOpen={showModalAccounts}
        onRequestClose={() => setShowModalAccounts(false)}
        onMenu={() => {
          setShowModalMenu(true);
          setTimeout(() => {
            setShowModalAccounts(false);
          }, 300);
        }}
      />
    </>
  );
});

export default Header;
