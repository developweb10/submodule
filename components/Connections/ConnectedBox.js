import React from "react";
import { check } from "../../images";

const ConnectedBox = ({ title, isRemove, onRemove, children, info }) => {
  return (
    <div className="border-[1px] border-color-[#e3e3e3] rounded py-1.5 px-2 h-[93px] flex flex-col justify-between mb-2">
      <div className="flex flex-row justify-between">
        <p className="text-[#645F5B] dark:text-[#ffffff] font-bold text-sm">
          {title}
        </p>

        <div className="flex cursor-pointer">
          {children}

          {isRemove && (
            <div
              onClick={onRemove}
              className="flex justify-center items-center h-[35px] w-[75px] border border-[#EAEAEA] rounded cursor-pointer"
            >
              <span className="font-semibold text-[#645F5B] dark:text-[#fff]">
                Remove
              </span>
            </div>
          )}
        </div>
      </div>

      {info && (
        <div className="flex flex-row justify-between">
          <span className="text-[#645F5B] dark:text-[#ffffff] text-sm truncate block">
            {info?.email}
          </span>
          <img height={20} width={20} src={check} />
        </div>
      )}
    </div>
  );
};

export default ConnectedBox;
