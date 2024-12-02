import React from "react";
import "./index.scss";
import { Image as AntdImage } from "antd";
import { useTheme } from "../../context/themeContext";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <AntdImage
          src={image.urls.regular}
          key={index}
          className={`gallery__imagePreview ${
            isDarkMode ? "gallery__darkBG" : "gallery__lightBG"
          }`}
        />
      ))}
    </div>
  );
};

export default Gallery;
