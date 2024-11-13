import { observer } from "mobx-react-lite";
import { useState,useRef } from "react";
import { check, lockIconRed, linkIconWhite } from "../images/index";
import { getProtectedLink, openLink } from "../http/userApi";
import { toast } from "react-toastify";

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
    background: '#F8F8F8',
    padding: '10px',
    radius: '5px',
    height: '85px',
    border: '1px solid #DAD7D4',
    color: '#1A1919'
  },
};

// Modal.setAppElement('#yourAppElement');
const ProtectedLink = observer(
  ({protectedLink}) => {
  const [editList, setEditLink] = useState(false);
  const [password, setPassword] = useState(null);
  const [placeholder, setPlaceholder] = useState("[asj987lli49-Z]");

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
  
/// Open Protected Link
  const openLinkBtn = async () => {
     const data = await openLink(
      protectedLink.id,
      password
      );
      if(data.id) {
        setIsOpen(true);
      }else {
        setPassword("");
        setPlaceholder("Incorrect password.");
      }      
  }
/// Cancel Changes
  const cancel = ()=>{
    setEditLink(false);
    setPassword("");
    setPlaceholder("");
  } 
/// Open Saved Url
  const openUrl = (e)=> {
    setIsOpen(false);
    setPassword("");
    setPlaceholder("[asj987lli49-Z]");    
    window.open(e, "_blank");
  }

    return (
        <>
        <div className="border-b border-EA mt-[40px] mb-[40px]"></div>
        {!editList && (   
          <>      
          <div class="w-full p-[10px] border rounded flex justify-between h-[62px] border-[#EAC5C3] mb-[70px]">
            <button
              onClick={() => setEditLink(true)}
              className="ml-auto mr-0 px-[10px] py-[6px] flex justify-center 
              items-center rounded bg-[#EAEAEA] font-semibold text-[10px]
              bg-[#FAF4EE] text-[#E1655C] border border-[#E8E7E366] leading-[12px] h-[27px]">
              Protected Link
              <img src={lockIconRed} className="cursor-pointer ml-[10px] h-[15px]" />
            </button>
          </div>  
          </>        
        )}
        {editList && (
        <div className="w-full p-2.5 bg-[#FFFFFF66] rounded flex flex-col justify-between border border-[#EAC5C3] mb-[40px]"
        >
          <span className="text-[#E1655C] font-regular text-[12px]">
            What is the password?
          </span> 
          <div className="relative mt-2 mb-5">
              <input
                placeholder={placeholder}
                className="bg-[#FAF4EE] px-2 placeholder-[#E1655C]  text-[#E1655C] font-regular outline-0 text-[14px] dark:text-[#E1655C] h-[35px] rounded w-full"
                maxLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img src={lockIconRed} className="cursor-pointer ml-[10px] h-[15px] absolute right-[10px] top-[10px]"
              />
          </div>   

          <div className="flex justify-between align-center">
            <div className="flex justify-start space-x-2">
              <button 
              type="button" 
              onClick={()=> {
                openLinkBtn()
              }}
              className="h-[25px] w-[49px] flex justify-center items-center space-x-1.5 border border-[#5FC650] text-[#5FC650] font-semibold cursor-pointer text-[10px] radius rounded-[5px]" >
                <span>Enter</span>
                <img height={10} width={10} src={check} />
              </button>
              <span className="border border-[#EAEAEA] text-[#645F5B] dark:text-[#FFFFFF] font-semibold cursor-pointer h-[25px] text-[10px] flex justify-center items-center rounded-[5px] w-[49px]"
                onClick={() => cancel()} >Cancel</span>
            </div>
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
            <div className="w-[507px] max-w-full">
            <div className="text-[#645F5B] font-regular text-[14px] mb-[10px] leading-none">
            Successfull!
            </div> 
            <div 
              className="relative"
              onClick={ (e)=> 
                openUrl(protectedLink?.link?.includes("http") ? protectedLink.link : `https://${protectedLink.link}`)
                }>
                <div  className="bg-[#589ED5] hover:bg-[#4081B4] active:bg-[#346E9C] px-2 text-[#fff] font-regular outline-0 text-[14px] dark:text-[#fff] h-[35px] rounded w-full p-2 cursor-pointer">{ protectedLink?.link?.includes("http") ? protectedLink.link : `https://${protectedLink.link}`}
                </div>  
                 <img src={linkIconWhite} className="cursor-pointer text-[#fff] ml-[10px] h-[11px] absolute right-[10px] top-[10px]"/>
              </div> 
            </div>
          </Modal>
        </div>
      </>
    )
}
);
export default ProtectedLink;