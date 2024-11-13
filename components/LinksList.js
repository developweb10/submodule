import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { Context } from "../index";
import LinkItem from "./LinkItem";
import ProtectedLink from "./ProtectedLink";
  const LinksList = observer(({onDelete}) => {
  const { user, links } = useContext(Context);
  const [itemId, setTimeId] = useState(""); 
  const [protectedLink, setProtectedLink] = useState("");
  return (
    <>
    <div className="flex flex-col justify-between space-y-2.5 mt-10 mb-5">
      {links.links.map((link, i) => (
        <>
        <LinkItem
          key={link.id}
          onDelete={() => {
            links.removeLink(link.id);
            onDelete();
          }}
          onEdit={(id, newTitle, newLink, desc) => {
            // links.setLinks(data);
            links.editLink(id, newTitle, newLink, desc);
          }}
          userId={user.user.id}
          link={link}
          index={i}
          onSwap={(e) => {
            e.preventDefault();
            links.swapLink(i, i - 1);
          }}
        />
          {!protectedLink && link.password != null ? setProtectedLink(link) : ""}
        </>
        
      ))}

    </div>
    { protectedLink && !user.user.id &&(
       <ProtectedLink
       protectedLink = {protectedLink}
       />
      )}
    </>
  );
});

export default LinksList;
