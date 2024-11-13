import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sun, dark, avatar_svg, blank_page_svg, searchIcon, search_svg } from "../images";
import { Context } from "../index";
import { ThemeContext, themes } from "../store/ThemeContext";
import {
  HOME_ROUTE,
  SEARCH_USER,
  TERMS_ROUTE,
  USER_ACCOUNT_ROUTE,
  USER_SETTINGS_ROUTE,
} from "../utils/consts";

import { listBookmarks } from "../http/userApi";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    height: 'auto',
    border: '0',

  },
};

const RightMenu = () => {
  const { user } = useContext(Context);
  const [isAuthPremium, setIsAuthPremium] = useState(user.user.is_premium);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme-color") === "white-content" ? false : true
  );

  const logOut = () => {
    user.setUser({});
    localStorage.removeItem("token");
    window.location.href = HOME_ROUTE;
  };

  const searchUser = (e) => {
    e.preventDefault();
    if (!searchValue) return;

    navigate(SEARCH_USER + searchValue.toLowerCase());
    navigate(0);
  };

  const [bookmarks, setBookmarks] = useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  
  const loadBookmarks = async(e) => {
      const data = await listBookmarks()
          .then((data) => { 
            setBookmarks(data);           
            setIsOpen(true);        
          })  
        .finally(); 
  }

   console.log(bookmarks);


  const renderThemeIcon = () => {
    return (
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <button
            className="self-end"
            color="link"
            onClick={() => {
              setDarkMode(!darkMode);
              changeTheme(darkMode ? themes.light : themes.dark);
              window.dispatchEvent(new Event("theme-color"));
            }}
          >
            <img
              height={30}
              width={30}
              src={darkMode ? dark : sun}
              className="ml-auto"
            />
          </button>
        )}
      </ThemeContext.Consumer>
    );
  };
const searchBookmark = (data)=> {
  if( data && data.length > 3 ) {
      const filtered = bookmarks.data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(data)));
      console.log({data:filtered});
      setBookmarks({data:filtered});   
  }else {
    loadBookmarks();
  } 
}
  return (
    <div>
      {user.isAuth && (
        <div className="hidden lg:flex bg-side border-l border-EA h-full w-40">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-2.5 w-full p-5">
              <button
                className={`hover:bg-[#f9f9f9] active:bg-[#f9f9f9] border border-EA rounded  font-semibold common-button common-button-text ${
                  pathname == USER_ACCOUNT_ROUTE ? "bg-[#EAEAEA99]" : ""
                }`}
                onClick={() => navigate(USER_ACCOUNT_ROUTE)}
              >
                Layer
              </button>
              <button
                className={`hover:bg-[#f9f9f9] active:bg-[#f9f9f9] border border-EA rounded  font-semibold common-button common-button-text ${
                  pathname == USER_SETTINGS_ROUTE ? "bg-[#EAEAEA99]" : ""
                }`}
                onClick={() => navigate(USER_SETTINGS_ROUTE)}
              >
                Settings
              </button>
              <button
                className="active:bg-[#eac5c3] border border-[#EAC5C3] rounded  text-[#E1655C] font-semibold hover:bg-[#fcf6f6] common-button common-button-text"
                onClick={logOut}
              >
                Sign out
              </button>

              <div
                style={{ marginTop: 20, marginBottom: 15 }}
                className="border-y-[0.5px] border-[#EAEAEA]"
              />

              <div className="bg-white rounded p-2.5">
                <div className="flex justify-between">
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://layer.page/${user?.user?.username}`
                      );
                      toast("Copied");
                    }}
                  >
                    <img
                      className="cursor-pointer"
                      src={blank_page_svg}
                      alt="Blank page icon"
                    />
                  </span>

                  <div className="h-[30px] w-[30px] rounded-full">
                    <img
                      style={{ height: "100%", width: "100%" }}
                      className="rounded-full"
                      src={user?.avatar || avatar_svg}
                    />
                  </div>
                </div>

                <span className="text-[#645F5B] font-regular inline-block mt-1 text-[12px]">
                  @{user?.user?.username}
                </span>
              </div>
              {user.isAuth && isAuthPremium && (
              <div 
              onClick = {()=> loadBookmarks() }
              class="flex justify-center items-center mt-20 lg:mt-0 border border-[#DFCEA4] px-2.5 py-1.5 rounded">
                <div class="flex justify-between items-center space-x-1.5 text-[#DFCEA4] font-semibold">
                  <span class="text-[#FEB600] text-[14px]">Bookmarks</span>
                </div>
              </div> 
              )} 

              <div>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                      <>
                    <div 
                    className="
                    w-[500px] max-w-full bg-[#F8F8F8] h-[328px] text-[#645F5B] dark:bg-[#000000] dark:text-[#fff] p-[10px]
                     border-[#DAD7D4] border-[1px] radius-[5px] rounded ">
                    <div className="font-regular text-[14px] mb-[10px] leading-none font-semibold text-[#645F5B] dark:text-[#fff] ">
                    Bookmarks
                    </div> 
                    <div className="relative">
                        <input                         
                        type="text"  
                        className="bg-[#589ED5] hover:bg-[#4081B4] active:bg-[#346E9C] px-2 text-[#fff] font-regular outline-0 text-[14px] dark:text-[#fff] h-[35px] rounded w-full p-2 cursor-pointer placeholder-[#fff]"
                        placeholder="Search"                        
                        onKeyUp={(e) => searchBookmark(e.target.value)}
                        onKeyDown={(e) => searchBookmark(e.target.value)}
                        />
                       <svg 
                       class="cursor-pointer text-[#fff] ml-[10px] w-[15px] h-[15px] absolute right-[10px] top-[10px]"
                       aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> 
                      </div> 
                      {bookmarks && (
                        <>
                        <div className="overflow-y-scroll h-[228px] mt-[30px]">
                        { bookmarks.data.map((item,i) => (
                          <>                         
                            <div 
                            className = {`relative px-2 text-[#645F5B] font-regular outline-0 text-[14px] dark:text-[#fff] h-[35px] w-full px-[5px] py-[10px] cursor-pointer placeholder-[#fff] border-[#DAD7D4] hover:bg-[#D6D6D633] h-[44px] dark:hover:bg-#D6D6D6 ${ (i==0) ? " border-y-[1px]" : "border-b-[1px]" }`}>  
                            <a href={ HOME_ROUTE.concat(item.username)}>@{item.username}
                              <img
                                src={
                                  item.avatar
                                    ? process.env.REACT_APP_API_URL + item.avatar
                                    : avatar_svg
                                }
                                className="cursor-pointer text-[#fff] ml-[10px] w-[25px] h-[25px] absolute right-[10px] top-[8px] rounded-full"
                              /></a>        
                            </div> 
                          </>
                        )) } 
                        </div>
                        </>                  
                      )}
                      {!bookmarks && (
                        <>                        
                          <div 
                          className="relative px-2 text-[#645F5B] font-regular outline-0 text-[14px] dark:text-[#fff] h-[35px] rounded w-full p-[10px] cursor-pointer placeholder-[#fff]  border-[#DAD7D4] hover:bg-[#D6D6D6] h-[44px] mt-[10px] border-y-[1px]">  
                          No Bookmarks Yet!
                          </div> 
                        </> 
                      )} 
                    </div>                      
                    </>
                  </Modal>
                </div>
                          

            </div>

            <div className="w-full">
              <div className="p-5">
                <form className="relative block" onSubmit={searchUser}>
                  <input
                    className="placeholder:text-[#67743D] block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs"
                    placeholder="@user"
                    type="text"
                    name="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <img
                      className={
                        searchValue?.length ? "bg-[#67743D] rounded" : ""
                      }
                      height={25}
                      width={25}
                      src={searchIcon}
                    />
                  </button>
                </form>
              </div>
              <div className="flex flex-col border-t border-EA px-5 py-5 pb-6 space-y-5">
                {renderThemeIcon()}

                <a href="https://layer.guide/legal" target="_blank">
                  <p className="text-[#645F5B] text-xs text-right cursor-pointer">
                    Privacy and terms
                  </p>
                </a>
                <p className="text-[#645F5B] text-xs font-extralight text-right">
                  © Layer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!user.isAuth && (
        <div className="hidden lg:flex bg-side border-l border-EA h-full items-end w-40">
          <div className="w-full">
            <div className="p-5">
              <form className="relative block" onSubmit={searchUser}>
                <input
                  className="placeholder:text-[#67743D] block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs"
                  placeholder="@user"
                  type="text"
                  name="search"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <img
                    className={
                      searchValue?.length ? "bg-[#67743D] rounded" : ""
                    }
                    height={25}
                    width={25}
                    src={searchIcon}
                  />
                </button>
              </form>
            </div>
            <div className="flex flex-col border-t border-EA px-5 py-5 pb-6 space-y-5">
              {renderThemeIcon()}
              <a href="https://layer.guide/legal" target="_blank">
                <p className="text-[#645F5B] text-xs text-right cursor-pointer">
                  Privacy and terms
                </p>
              </a>

              <p className="text-[#645F5B] text-xs font-extralight text-right">
                © Layer
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 p-5 block lg:hidden">
        {renderThemeIcon()}
      </div>
    </div>
  );
};

export default RightMenu;
