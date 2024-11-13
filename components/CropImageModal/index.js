import { useCallback, useState } from "react";
import ReactModal from "react-modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./styles.css";

const CropImageModal = ({
  isVisible,
  selectedImage,
  onClose,
  onEditComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDark, setDark] = useState(
    localStorage.getItem("theme-color") === "white-content"
  );

  const [croppedArea, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(selectedImage, croppedArea);

      urlToObject(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedArea]);

  const urlToObject = async (img) => {
    const response = await fetch(img);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    console.log({ file });
    onEditComplete(file);
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      style={{
        overlay: {
          background: isDark ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.5)",
        },
        content: {
          height: "80%",
          margin: "auto",
          width: "80%",
          display: "flex",
          background: isDark ? "#000" : "#fff",
          border: "0px",
        },
      }}
    >
      <div className="App">
        <div className="crop-container">
          <Cropper
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
        </div>

        <div className="flex-row flex absolute z-50 bottom-[10px] w-fit bottomButtons">
          <div
            onClick={showCroppedImage}
            className="flex  border border-[#589ED5] text-[#589ED5] px-2.5 rounded cursor-pointer font-semibold common-button w-[100px]"
          >
            Done
          </div>

          <div
            onClick={onCancel}
            className="ml-[20px] flex border border-[#E1655C] text-[#E1655C] px-2.5 rounded cursor-pointer font-semibold common-button w-[100px]"
          >
            Cancel
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CropImageModal;
