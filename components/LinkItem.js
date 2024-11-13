import { observer } from "mobx-react-lite";
import { useState } from "react";
import { deleteLink, editLink, openLink, getInfo } from "../http/userApi";
import { check, deleteIcon, editIcon, handCursor, linkIcon, lockIconRed } from "../images";
import ProtectedLink from "./ProtectedLink";

const LinkItem = observer(
  ({ userId, link, onDelete, onEdit, index, onSwap }) => {
    const [editList, setEditLink] = useState(false);
    const [title, setTitle] = useState();
    const [newLink, setNewLink] = useState();
    const [description, setNewDescription] = useState("");
    const [password, setPassword] = useState(link.password);
    const [openLinkForm, setOpenLinkForm] = useState(false);

/// Remove Link   
    const removeLink = async () => {
      await deleteLink(link.id);
      onDelete();
    };

/// Update Link
    const modifyLink = async (e) => {
      e.preventDefault();
      let verifyLink = newLink || link.link,
      verifyTitle = title || link.title;
      const data = await editLink(
        link.id,
        verifyTitle,
        verifyLink,
        description,
        password
      );
      setEditLink(false);
      onEdit(link.id, verifyTitle, verifyLink, description);
    };

/// Cancel Protected Settings 
  const cancelCreateLink2 = () => {
    setOpenLinkForm(false);
  }; 

/// Open Protected Link
  const readLink = async (e) => {
    e.preventDefault();
    await openLink(link.id, password);
    return false;
  }

    return (      
      <>
        {userId === link.userId && (
          <>
            {!editList && link.password == null && (

              <div
                onClick={() => {
                  setEditLink(true);
                  setNewDescription(link?.description ?? "");
                }}
                className={`h-[62px] w-full p-[10px] rounded border hover:border-[#589ED5] bg-[#FAF4EE66]
                ${link.password!=null ? "border-[#EAC5C3]" : "border-[#EAEAEA]" }
                `}>
                <div className="flex justify-between">
                  <a
                    href={link.link}
                    className="text-[#645F5B] font-semibold self-center common-button-text dark:text-[#FFFFFF]"
                    target="_blank"
                  >
                    {link.title} 
                  </a>
                  <img
                    height={15}
                    width={15}
                    src={editIcon}
                    className="cursor-pointer object-contain"
                  />
                </div>
                <span className="text-[12px] text-[#645F5B] dark:text-[#fff]">
                  {link?.description}
                </span>
              </div>

              
            )}
            
            {editList && (
              <form
                className={
                  `w-full p-2.5 bg-[#FFFFFF66] rounded flex flex-col justify-between 
                  border ${ link.password!=null ? "border-[#EAC5C3]" : "border-[#EAEAEA]" }`
                }
                onSubmit={modifyLink}
              >
                <div className="flex justify-between">
                  <input
                    type="text"
                    className="bg-transparent text-[#645F5B] font-semibold outline-0 text-[14px] dark:text-[#FFFFFF]"
                    defaultValue={link.title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="[Link title]"
                  />
                </div>

                <input
                  defaultValue={link?.description || ""}
                  placeholder="[Link description (max. 50 characters)]"
                  className="outline-0 mt-[5px] mb-[15px] text-[12px] text-[#645F5B] bg-transparent dark:text-[#fff]"
                  maxLength={50}
                  onChange={(e) => setNewDescription(e.target.value)}
                />

                <input
                  type="text"
                  className="bg-[#eaeaea] px-2 mt-1.5 mb-5 text-[#645F5B] font-regular outline-0 text-[14px] dark:text-[#645F5B] h-[35px] rounded"
                  defaultValue={link.link}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="[URL]"
                />

              {link.password!=null &&(
                <>
                  <span
                  className="text-[#E1655C] font-regular text-[12px] h-[15px] w-[156px] mb-5"
                  >The password protecting it:</span>  
                  <input
                  placeholder="[asj987lli49-Z]"
                  className="bg-[#FAF4EE] px-2 placeholder-[#E1655C] mt-1.5 mb-5 text-[#E1655C] font-regular outline-0 text-[14px] dark:text-[#E1655C] h-[35px] rounded"
                  maxLength={12}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                </>
                )}                
                <div className="flex justify-between mt-2">
                  {/* Left Container */}
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="h-[25px] w-[49px] flex justify-center items-center space-x-1.5 border border-[#5FC650] text-[#5FC650] font-semibold cursor-pointer text-[10px] rounded-[5px]"
                    >
                      <span>Save</span>
                      <img height={10} width={10} src={check} />
                    </button>
                    <span
                      className="border border-[#EAEAEA] text-[#645F5B] font-semibold cursor-pointer h-[25px] text-[10px] flex justify-center items-center rounded-[6px] dark:text-[#FFFFFF] w-[49px]"
                      onClick={() => setEditLink(false)}
                    >
                      Cancel
                    </span>
                  </div>

                  {/* Right Container */}
                  <div className="flex space-x-2">
                    {index > 0 ? (
                      <button
                        onClick={onSwap}
                        className="flex h-[25px] w-[25px] bg-[#EAEAEA] rounded justify-center items-center"
                      >
                        <img src={handCursor} height={15} width={15} />
                      </button>
                    ) : null}
                    <button
                      className="flex h-[25px] w-[25px] bg-[#EAEAEA] rounded justify-center items-center"
                      onClick={() => removeLink()}
                    >
                      <img src={deleteIcon} height={15} width={15} />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {userId !== link.userId && (
          <>         
        {link.password == null && (
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={
              link?.link?.includes("http") ? link.link : `https://${link.link}`
            }
            className="h-[62px] group w-full p-2 bg-[#FAF4EE66] rounded  border border-[#EAEAEA] hover:border-[#589ED5]"
          >
            <div className="flex justify-between">
              <span
                className="w-full text-[14px] text-[#645F5B] font-semibold dark:text-[#FFFFFF]"
                target="_blank"
              >
                {link.title}
              </span>
              <img
                className="opacity-0 object-contain group-hover:opacity-100"
                height={15}
                width={15}
                src={linkIcon}
              />
            </div>
            <span className="text-[12px] text-[#645F5B] dark:text-[#fff]">
              {link?.description}
            </span>
          </a>
        )}                  
          </>
        )}
      </>
    );
  }
);

export default LinkItem;
