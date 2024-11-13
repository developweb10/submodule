import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMessage, readMessage, starredMessage } from "../http/messageApi";
import { star, trash } from "../images";
import { isEmail } from "../utils";
import { SEARCH_USER } from "../utils/consts";
import MessagePopup from "./MessagePopup";
import CheckBox from "./CheckBox";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const MessageItem = observer(
  ({ userId, message, onDelete, onMark, onRead }) => {
    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(false);

    const date = new Date(message.createdAt);

    const dateTime =
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      ", " +
      date.getDate() +
      " " +
      date.toLocaleString("en-US", { month: "short" }) +
      " " +
      date.getFullYear();

    let dateTimeModify = dateTime;

    var now = new Date();
    var today = now.getFullYear()+'/'+now.getMonth()+'/'+now.getDate();
    var date2 = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
    // console.log(date2);
     if(today.toLocaleString() == date2.toLocaleString()){
      dateTimeModify = date.getHours() +":" + (date.getMinutes() < 10 ? "00" : "30");
     }     

      // console.log(now.isSame(b)); 

/// Confirm before deleting the message     
    const confirmDelete = async () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div 
            className='w-[240px] fixed lg:w-[225px] h-[150px] bg-[#F8F8F8] self-center dark:bg-[#000000] rounded border-[#DAD7D4] m-auto inset-x-0 inset-y-0 p-[10px] border-[1px] rounded custom-items-center'>
              <h1
                className="text-[14px] text-[#645f5b] font-semibold dark:text-[#ffffff] mb-[20px] justify-left"
              >Permanently delete?</h1>
              <button
              className="message-btn btn-delete w-[195px] p-[5px] text-[#e1655c] m-[5px] border-[1px] border-[#eac5c3] rounded"
                onClick={() => {
                  destroyMessage();
                  onClose();
                }}
              >
                 Delete
              </button>
              <button 
              className="message-btn btn-cancel w-[195px] p-[5px] text-[#645f5b] m-[5px] border-[1px] border-[#eaeaea] dark:border-[#ffffff] dark:text-[#ffffff] rounded"
              onClick={onClose}>Cancel</button>         
            </div>
          );
        }
      });
    };

/// Delete the selected message     
    const destroyMessage = async () => {
      const data = await deleteMessage(message.id);
      onDelete();

      isOpen && setOpen(false);
    };

    const markMessage = async () => {
      const data = await starredMessage(message.id);
      onMark();
    };

    const openMessage = async () => {
      setOpen(true);
    };

    

    return (
      <>
        {message.userId === userId && (
          <div className="border border-[#DAD7D4] bg-[#D7E7A966] rounded p-2.5">
            <div className="flex justify-between">
              <h2 className="font-semibold dark:text-[#FFFFFF]">
                To:{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => navigate(SEARCH_USER + message.to)}
                >
                  @{message.to}
                </span>
              </h2>
              <span className="text-[9px] dark:text-[#FFFFFF]">{dateTime}</span>
            </div>
            <div className="flex flex-col justify-between relative">
              <div className="w-auto h-7 transition duration-200 ease-in-out cursor-pointer"
                onClick={() => openMessage()}
              >
                <p className="truncate dark:text-[#FFFFFF]">{message.body}</p>
              </div>
              <div className="left-0 bottom-0 flex space-x-2.5 "> 
              &nbsp;
              <CheckBox 
                message={message}
                userId={userId}
              />
              </div>              
              {/*<span
                className="cursor-pointer w-full text-center dark:text-[#FFFFFF]"
                onClick={() => openMessage()}
              >
                Open
              </span>
              */}
              <div className="absolute right-0 bottom-0 flex justify-between space-x-2.5">
                <div
                  onClick={confirmDelete}
                  className="cursor-pointer flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99] justify-center items-center"
                >
                  <img height={15} width={15} src={trash} />
                </div>

                <div
                  style={message.SenderStarred ? { background: "#110f0f" } : {}}
                  onClick={markMessage}
                  className="cursor-pointer ml-[10px] flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99] justify-center items-center"
                >
                  <img height={15} width={15} src={star} />
                </div>
              </div>
            </div>
          </div>
        )}

        {message.userId !== userId && (
          <div
            className={
              message.status
                ? "border border-[#DAD7D4] rounded p-2.5"
                : "border border-[#DAD7D4] bg-[#D7E7A966] rounded p-2.5"
            }
          >
            <div className="flex justify-between">
              <h2 className="font-semibold dark:text-[#FFFFFF]">
                From:{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => navigate(SEARCH_USER + message.from)}
                >
                  {isEmail(message.from) ? "" : "@"}
                  {message.from}
                </span>
              </h2>
              <span className="text-[9px] dark:text-[#FFFFFF]">{dateTimeModify}</span>
            </div>
            <div className="flex flex-col justify-between relative">
              <div className="w-auto h-7 transition duration-200 ease-in-out cursor-pointer "
               onClick={() => openMessage()}
               >
                <p className="truncate dark:text-[#FFFFFF]">{message.body}</p>
              </div>
              <div className="justify-between space-x-2.5 "> 
              &nbsp;
              <CheckBox 
                message={message}
                userId={userId}
              />
              </div>
              {/*<span
                className="cursor-pointer w-full text-center dark:text-[#FFFFFF] h-[25px] w-[25px]"
                onClick={() => openMessage()}
              >
                Open
              </span>
              */}
              <div className="absolute right-0 bottom-0 flex justify-between space-x-2.5">
                <div
                  onClick={confirmDelete}
                  className="cursor-pointer flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99]  justify-center items-center"
                >
                  <img height={15} width={15} src={trash} />
                </div>
                {/* <div onClick={markMessage}>
                  {!message.ReceiverStarred && (
                    <img src={star_svg} className="cursor-pointer" />
                  )}
                  {message.ReceiverStarred && (
                    <img src={marker_star_svg} className="cursor-pointer" />
                  )}
                </div> */}

                <div
                  style={
                    message.ReceiverStarred ? { background: "#110f0f" } : {}
                  }
                  onClick={markMessage}
                  className="cursor-pointer ml-[10px] flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99] justify-center items-center"
                >
                  <img height={15} width={15} src={star} />
                </div>
              </div>
            </div>
          </div>
        )}

        <MessagePopup
          isOpen={isOpen}
          onRequestClose={async () => {
            setOpen(false);

            if (userId !== message.userId) {
              await onRead();
              await readMessage(message.id);
            }
          }}
          message={message}
          dateTime={dateTime}
          userId={userId}
          onFav={markMessage}
          onDelete={destroyMessage}
        />
      </>
    );
  }
);

export default MessageItem;
