import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSelectedMessages, starSelectedMessages } from "../http/messageApi";
import { sort_svg } from "../images";
import { Context } from "../index";
import colors from "../utils/colors";
import MessageItem from "./MessageItem";
import CheckBox from "./CheckBox";
import { star, trash } from "../images";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const MessagesList = observer(( {onDelete, onMark}) => {
  let [hidden, setHidden] = useState(false);
  const { user, messages } = useContext(Context);
  const [orderBy, setOrderBy] = useState(false);
  const [msgFilter, setMsgFilter] = useState("all");

  function sortByIdThenName(a, b) {
    if (orderBy) {
      const n = a.createdAt - b.createdAt;
      return a.createdAt.localeCompare(b.createdAt);
    } else {
      const n = b.createdAt - a.createdAt;
      return b.createdAt.localeCompare(b.createdAt);
    }
  }

  const checkAll = (e) => {

    const elements =document.querySelectorAll(".hidden-btn");
    elements.forEach((element) => {
      element.classList.add('hidden');
    });   
    var value  = false
    if(e.target.checked){
      value = true;
      elements.forEach((element) => {
        element.classList.remove('hidden');
      });      
    }  
    document.querySelectorAll("input[name=selectMessage]")
     .forEach((checkbox) => {
       checkbox.checked = value;
     });
  }

///// Mark All Message As Stared
  const starAll = async () => {
    let counter = 0;
    var starAllItems = {};  
      document.querySelectorAll("input[name=selectMessage]")
      .forEach((checkbox) => {
        if(checkbox.checked)
        {
          starAllItems[counter] = checkbox.defaultValue;
          counter++;
        }
      });          
    // console.log('stated:', starAllItems);  
    const data = await starSelectedMessages(starAllItems);
    //console.log("stared:"); 
      document.querySelectorAll("input[name=selectMessage]")
      .forEach((checkbox) => {
        if(checkbox.checked)
        {  
          messages.markedMessage(checkbox.defaultValue);
        }
      });
  }

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
              deleteAll();
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

  const deleteAll = async () => {
    let counter = 0;
    var deleteAllItems = {};  
      document.querySelectorAll("input[name=selectMessage]")
      .forEach((checkbox) => {
        if(checkbox.checked)
        {
          deleteAllItems[counter] = checkbox.defaultValue;
         counter++;
        }
      });          
    console.log('deleted:', deleteAllItems);
    const data = deleteSelectedMessages(deleteAllItems);
    document.querySelectorAll("input[name=selectMessage]")
      .forEach((checkbox) => {
        if(checkbox.checked)
        {  
          messages.removeMessage(checkbox.defaultValue);
        }  
      });              
  }


  const totalTask = messages.messages.slice().sort(sortByIdThenName).length;

  return (     

    <>
      <div className="flex justify-between mb-2.5 items-center mt-20 lg:mt-0 border-b border-EA border-blue py-2.5 custom-blue">
        <div className="flex justify-between space-x-1.5 items-center text-xs">
          <span
            className={`border border-EA px-2  rounded-full font-semibold cursor-pointer dark:text-[#FFFFFF] message-status-buttons ${
              msgFilter === "all" ? "bg-[#f0eeec] dark:bg-[#000]" : ""
            }`}
            onClick={() => setMsgFilter("all")}
          >
            All
          </span>
          <span
            className={`active:bg-[#67743D] active:text-[#fff] border border-[#67743D] text-[#67743D] px-2  rounded-full font-semibold cursor-pointer message-status-buttons hover:bg-[#67743D26] ${
              msgFilter === "unread"
                ? "bg-[#67743D] text-[#ffffff] hover:bg-[#67743D]"
                : ""
            }`}
            onClick={() => setMsgFilter("unread")}>
            Unread
          </span>
          <span
            className={`active:bg-[#D8A340] active:text-[#fff] border border-[#D8A340] text-[#D8A340] px-2  rounded-full font-semibold cursor-pointer message-status-buttons hover:bg-[#D8A34026] ${
              msgFilter === "starred"
                ? "bg-[#D8A340] text-[white] hover:bg-[#D8A340]"
                : ""
            }`}
            onClick={() => setMsgFilter("starred")}>
            Starred
          </span>
          <span
            className={`active:bg-[#589ED5] active:text-[#fff] border border-[${
              colors.skyBlue
            }] text-[${
              colors.skyBlue
            }] px-2  rounded-full font-semibold cursor-pointer message-status-buttons hover:bg-[#589ED526] ${
              msgFilter === "sent"
                ? `bg-[#589ED5] text-[#ffffff] hover:bg-[#589ED5]`
                : ""
            }`}
            onClick={() => setMsgFilter("sent")}>
            Sent
          </span>
        </div>
        <div className="flex items-center  space-x-1.5 cursor-pointer h-[25px] w-[200px] justify-right">
          <div 
          className="rounded hover:bg-[#589ed5] cursor-pointer ml-[10px] flex h-[25px] w-[25px] justify-center items-center trash-icon hidden hidden-btn custom-border"  
          >
            <img  height={15} width={15} src={trash} 
            onClick={confirmDelete}
            />
          </div>
          <div 
          className="cursor-pointer rounded hover:bg-[#589ed5] ml-[10px] flex h-[25px] w-[25px] justify-center items-center hidden hidden-btn custom-border"          >
            <img height={15} width={15} src={star} 
            onClick={starAll} 
            />
          </div>
          <div className="cursor-pointer ml-[10px] flex h-[25px] w-[25px] rounded justify-center items-center" 
            >
            <input   
              onChange={checkAll}       
              type="checkbox"
              id="checkAll"
              name="checkAll"
              defaultChecked={false}
            />
          </div>  
          <div className="bg-EA rounded flex items-center  space-x-1.5 cursor-pointer h-[25px] w-[75px] justify-center right-0">
          <span onClick={() => setOrderBy(!orderBy)} className="text-[12px] text-[#645F5B] font-semibold">
            By date
          </span>
          <img onClick={() => setOrderBy(!orderBy)}
            height={15}
            width={15}
            src={sort_svg}
            className={
              orderBy
                ? "origin-center rotate-180 transition"
                : "origin-center rotate-0 transition"
            }
          />
          </div>
        </div>
      </div>


      <div 
      className= { totalTask >10 ?'block flex-col space-y-2.5 pb-2 custom-message-scroll':'block flex-col space-y-2.5 pb-2 message-no-scroll'}>
        {/* <div className="flex flex-col space-y-2.5 pb-16"> */}
        {/* All */}
        {msgFilter === "all" && (
          <>
            {messages.messages.slice().sort(sortByIdThenName).length === 0 && (
              <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">
                No letters
              </span>
            )}
            {messages.messages
              .slice()
              .sort(sortByIdThenName)
              .map((message, i) => (
                <MessageItem
                  key={message.id}
                  onDelete={() => {
                    messages.removeMessage(message.id);
                  }}
                  onMark={() => {
                    messages.markedMessage(message.id);
                  }}
                  onRead={() => {
                    messages.readThisMessage(message.id);
                  }}
                  userId={user.user.id}
                  message={message}
                />
              ))}                      
              
          </>
        )}

        {/* Unread */}
        {msgFilter === "unread" && (
          <>
            {messages.messages
              .filter(
                (msg) => msg.status === false && msg.userId !== user.user.id
              )
              .slice()
              .sort(sortByIdThenName).length === 0 && (
              <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">
                The "Unread" tab is empty
              </span>
            )}
            {messages.messages
              .filter(
                (msg) => msg.status === false && msg.userId !== user.user.id
              )
              .slice()
              .sort(sortByIdThenName)
              .map((newMsg) => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => {
                    messages.removeMessage(newMsg.id);
                  }}
                  onMark={() => {
                    messages.markedMessage(newMsg.id);
                  }}
                  onRead={() => {
                    messages.readThisMessage(newMsg.id);
                  }}
                  userId={user.user.id}
                  message={newMsg}
                />
              ))}
          </>
        )}

        {/* Starred */}
        {msgFilter === "starred" && (
          <>
            {messages.messages
              .filter(
                (msg) =>
                  (msg.SenderStarred === true && msg.userId === user.user.id) ||
                  (msg.ReceiverStarred === true && msg.userId !== user.user.id)
              )
              .slice()
              .sort(sortByIdThenName).length === 0 && (
              <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">
                The "Starred" tab is empty
              </span>
            )}
            {messages.messages
              .filter(
                (msg) =>
                  (msg.SenderStarred === true && msg.userId === user.user.id) ||
                  (msg.ReceiverStarred === true && msg.userId !== user.user.id)
              )
              .slice()
              .sort(sortByIdThenName)
              .map((newMsg) => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => {
                    messages.removeMessage(newMsg.id);
                  }}
                  onMark={() => {
                    messages.markedMessage(newMsg.id);
                  }}
                  onRead={() => {
                    messages.readThisMessage(newMsg.id);
                  }}
                  userId={user.user.id}
                  message={newMsg}
                />
              ))}
          </>
        )}

        {/* Sent */}
        {msgFilter === "sent" && (
          <>
            {messages.messages
              .filter((msg) => msg.from === user.user.username)
              .slice()
              .sort(sortByIdThenName).length === 0 && (
              <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">
                The "Sent" tab is empty
              </span>
            )}
            {messages.messages
              .filter((msg) => msg.from === user.user.username)
              .slice()
              .sort(sortByIdThenName)
              .map((newMsg) => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => {
                    messages.removeMessage(newMsg.id);
                  }}
                  onMark={() => {
                    messages.markedMessage(newMsg.id);
                  }}
                  onRead={() => {
                    messages.readThisMessage(newMsg.id);
                  }}
                  userId={user.user.id}
                  message={newMsg}
                />
              ))}
          </>
        )}
        {/* </div> */}
      </div>
                     <div 
                class="border-t border-EA w-full space-y-10 custom-blue"
                >&nbsp;
                </div>  
    </>
  );
});

export default MessagesList;
