import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
var myIterable = {};
const CheckBox = ({
  message,
  userId,
  }) => {

  // console.log(message);
    const [messageIds, setMessageIds] = useState([]);
    const handleChange = event => {
      let counter = 0;
      document.querySelectorAll("input[name=selectMessage]")
      .forEach((checkbox) => {
        if(checkbox.checked)
        {
          // myIterable[counter] = checkbox.defaultValue;
         // setMessageIds( checkbox.defaultValue });
         counter++;
        }
      });

      console.log(counter);
      if(counter <=0) {
        document.getElementById("checkAll").checked = false;
        const elements =document.querySelectorAll(".hidden-btn");
        elements.forEach((element) => {
          element.classList.add('hidden');
        });
      }
      else {
        document.getElementById("checkAll").checked = true;
        const elements =document.querySelectorAll(".hidden-btn");
        elements.forEach((element) => {
          element.classList.remove('hidden');
        });        
      }
    };

    const onClick = () => handleChange(true)
    return (
      <>
        <input
          type="checkbox"
          name="selectMessage"
          value={ message.id }
          onChange={handleChange}
          id="selectmessage"
          className="selectMessage" />
        </>
    );
  };
export default CheckBox;
