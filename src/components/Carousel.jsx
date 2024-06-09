/* eslint-disable no-unused-vars */

import { useEffect, useReducer, useRef, useState } from "react";

/* eslint-disable react/prop-types */
const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevBtn,
  customNextBtn,
  onImageClick = () => {},
  imagePerSlide = 1,
}) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      setcurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit- 1 : prevIndex - 1
    );
  };
  const goToNext = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1
    );
  };

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className="carousel" style={{ width: imagePerSlide * imageWidth }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imageWidth}px)` }}
      >
        {images.slice(0, imageLimit).map((image, index) => {
          return (
            <img
              onLoad={() => setImageWidth(imageRef?.current?.offsetWidth)}
              ref={imageRef}
              key={image.id}
              src={image.url}
              alt={image.title}
              onClick={() => onImageClick(image, index)}
              className="image"
            />
          );
        })}
      </div>
      {customPrevBtn instanceof Function ? (
        customPrevBtn(goToPrev)
      ) : (
        <div className="btn prev" onClick={goToPrev}>
          Prev
        </div>
      )}
      {customNextBtn instanceof Function ? (
        customNextBtn(goToNext)
      ) :  <div className="btn next" onClick={goToNext}>
        Next
      </div>}
     
    </div>
  );
};

export default Carousel;
