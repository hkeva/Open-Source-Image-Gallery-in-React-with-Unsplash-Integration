import React from "react";
import "./index.scss";
import { Image as AntdImage } from "antd";

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
  return (
    <div className="gallery">
      {images.map((image) => (
        <AntdImage src={image.urls.regular} className="gallery__imagePreview" />
      ))}
    </div>
  );
};

export default Gallery;
