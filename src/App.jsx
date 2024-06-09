import { useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel";
import { useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  //https://jsonplaceholder.typicode.com/photos?_limit=8

  console.log(images)

  const fetchImage = async (imageLimit) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`
      );
      const data = await response.json();
     
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage(8)
  },[])

  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imageLimit={4}
        //customPrevBtn={}
        // customNextBtn={}
      />
    </div>
  );
}

export default App;
