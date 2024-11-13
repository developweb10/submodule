import React from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { reply, star, trash } from "../images";
import { SEARCH_USER } from "../utils/consts";

const MessagePopup = ({
  isOpen,
  onRequestClose,
  message,
  dateTime,
  userId,
  onFav,
  onDelete,
}) => {
  const navigate = useNavigate();

  const isSend = message.userId === userId;

  const onReply = () => {
    onRequestClose();

    let replyUser = isSend ? message.to : message.from;

    navigate(SEARCH_USER + replyUser);
  };

  return (
    <ReactModal
      style={{ overlay: { background: "rgba(26, 25, 25, 0.6)" } }}
      shouldFocusAfterRender={false}
      shouldCloseOnEsc
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={300}
      className="w-[335px] fixed lg:w-[600px] h-[400px] bg-[#F8F8F8] self-center dark:bg-[#000000] rounded border-[#DAD7D4] m-auto inset-x-0 inset-y-0 p-[20px] border-[1px]"
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex flex-col h-full">
        {/* Message Info */}
        <section className="flex flex-row justify-between items-center">
          {message.userId === userId ? (
            <p className="text-[14px] text-[#645F5B] font-semibold dark:text-[#ffffff]">
              To: {message.to}
            </p>
          ) : (
            <p className="text-[14px] text-[#645F5B] font-semibold dark:text-[#ffffff]">
              From: {message?.from}
            </p>
          )}
        </section>
        {/* Message */}
        <textarea  className="h-full overflow-y-scroll my-2 text-[14px]  text-[#645F5B] font-normal dark:text-[#ffffff] dark:bg-[#000000]  bg-[#F8F8F8] border-[1px] border-[#DAD7D4] no-scrollbar">
          {message?.body}
        </textarea>

        {/* Buttons */}

        <section className="mt-auto flex flex-row justify-between items-start">
          {/* Reply Button */}
          <button
            onClick={onReply}
            className="flex items-center border rounded border-[#589ED5] text-[12px] text-[#589ED5] font-semibold w-[62px] h-[25px] justify-center flex-row"
          >
            Reply
            <img className="ml-[4px]" height={10} width={10} src={reply} />
          </button>

          <p className="text-[9px] md:text-lg12 text-[#808080b5] font-semibold dark:text-[#ffffff]">
            [{dateTime}]
          </p>

          <div className="flex flex-row">
            {/* Delete Icon */}
            <div
              onClick={onDelete}
              className="cursor-pointer flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99] justify-center items-center"
            >
              <img height={15} width={15} src={trash} />
            </div>

            {/* Star Icon */}

            <div
              style={
                (isSend && message?.SenderStarred) ||
                (!isSend && message?.ReceiverStarred)
                  ? { background: "#110f0f" }
                  : {}
              }
              onClick={onFav}
              className="cursor-pointer ml-[10px] flex h-[25px] w-[25px] rounded bg-[#eaeaeb4d] hover:bg-[#eaeaeb99] justify-center items-center"
            >
              <img height={15} width={15} src={star} />
            </div>
          </div>
        </section>
      </div>
    </ReactModal>
  );
};

export default MessagePopup;
