import React from "react";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images, onToggleFavorite, isFavorite }) => {
  // let onToggleFavorite = () => console.log("Hii");
  // let isFavoriteCheck = () => console.log("Hello");

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((img, idx) => (
          <ImageCard
            key={idx}
            img={img}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(img.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGrid;