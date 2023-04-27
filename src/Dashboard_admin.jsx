import React, { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./dashboard.css";
import store from "./store";
import {useLocation, useNavigate } from "react-router-dom";
import cat1 from "./cat1.jpg";
import cat2 from "./cat2.jpg";
import cat3 from "./cat3.jpg";
import horse1 from "./horse1.jpg";
import horse2 from "./horse2.jpg";
import horse3 from "./horse3.jpg";
import dog1 from "./dog1.jpg";
import dog2 from "./dog2.jpg";
import dog3 from "./dog3.jpg";
import dog4 from "./dog4.jpg";
import cat4 from "./cat4.jpg"
import cat5 from "./cat5.jpg"

const Dashboard = () => {
  console.log(store)
  const [images, setImages] = useState(() => {
    const imageSources = [cat1, cat2, cat3, horse1, horse2, horse3, dog1, dog2, dog3, cat4, cat5, dog4];
    return imageSources.map((src) => ({ src, label: "" }));
  });
  const location = useLocation();
  const role = location.state?.role || "user";
  const isAdmin = role === "admin";

  const [searchQuery, setSearchQuery] = useState("");
  const [newLabel, setNewLabel] = useState(""); // New label state
  const [newOption, setNewOption] = useState("");
  const carouselRef = useRef(null);


  const handleLabelChange = (index, newLabel) => {
    const newImages = [...images];
    newImages[index].label = newLabel;
    setImages(newImages);
  };

  const handleLabelRemove = (index) => {
    const newImages = [...images];
    newImages[index].label = "";
    setImages(newImages);
  };
 
 const handleAddNewLabel = (index) => {
    const newImages = [...images];
    newImages[index].label = newLabel;
    setNewLabel(""); // Reset the new label state
    // Update the labelOptions array with the new label
    if (!store.options.includes(newLabel)) {

      store.addOption(newLabel);
      setNewOption("");
    }
  };
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform sign out logic here
    // For example, clear user session, reset state, etc.
    // Then navigate to the login page
    navigate("/");
  };

  

  const filteredImages = images.filter((image) =>
    image.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
useEffect(() => {
    const handleKeyDown = (event) => {
      const keyCode = event.keyCode || event.which;
      if (keyCode === 37) {
        // Left arrow key
        carouselRef.current?.previous();
      } else if (keyCode === 39) {
        // Right arrow key
        carouselRef.current?.next();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
    <button className="sign-out" onClick={handleSignOut}>Sign out</button>
    <h2>{isAdmin ? "Admin" : "User"} Dashboard</h2>

    <div className="dashboard">
      <Carousel showArrows={true} showThumbs={false} autoPlay={true} centerMode={true}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.src} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
            <div className="label-wrapper">
              <select
                className="label-select"
                value={image.label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
              >
                <option value="">Choose a label</option>
                {store.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              {image.label && <button onClick={() => handleLabelRemove(index)}>x</button>}
              {image.label && <p className="label">{image.label}</p>}
              
              {role === "admin" && (
        <div>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Enter Label"
          />
          <button classname="addbtn" onClick={() => handleAddNewLabel(index)}>Add</button>
        </div>
      )}
      {role !== "admin" && !image.label && <p>Add Label option is available for admin only.</p>}
            </div>
          </div>
        ))}
      </Carousel>
         <h2>Filter</h2>
      <div className="search-bar">
        <select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
          <option value="">Filter by label</option>
          {store.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="image-gallery">
        {filteredImages.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.src} alt={`Image ${index + 1}`} className="image" />
            <div className="label">{image.label}</div>
          </div>
        ))}
      </div>
    </div>
        </div>
  );
};

export default Dashboard;
