import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { isMobile } from "../../utils";
import { useMedia } from "../../utils/use-media";

const Loader = ({ isVisible }) => {
  let mobile = useMedia(isMobile);

  return (
    <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-white dark:bg-[#1A1919] z-10">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width={mobile ? "30" : "55"}
        visible={isVisible}
      />
    </div>
  );
};

export default Loader;
