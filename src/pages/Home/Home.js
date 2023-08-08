import React, {useEffect,useState} from "react";
import {Element,scroller} from "react-scroll";
import { Navigate, useNavigate } from "react-router-dom";
import "./Home.css";
import { Card } from "antd";
import { useUserContext } from "../../UserContext"; // Import the useUserContext hook

function Home() {
  const icon1 = "research.png";
  const icon2 = "reader.png";
  const icon3 = "website.png";
  const wishlist = "wishlist.png";

  const navigate = useNavigate();

  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isListInView, setIsListInView] = useState(false);

// Use the useUserContext hook to access the userId and username
const { userId, username } = useUserContext();

  const scrollToVideo = () => {
    scroller.scrollTo("video", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.querySelector("#video");
      if (videoElement) {
        const videoPosition = videoElement.getBoundingClientRect();
        if (videoPosition.top < window.innerHeight && videoPosition.bottom >= 0) {
          setIsVideoInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToList = () => {
    scroller.scrollTo("list", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const listElement = document.querySelector(".listIcon");
      if (listElement) {
        const bannerPosition = listElement.getBoundingClientRect();
        if (bannerPosition.top < window.innerHeight && bannerPosition.bottom >= 0) {
          setIsListInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Card style={{margin: '20px'}}>
    <div>
      <div id="banner">
        <span id="slogan">
          Your personalized guide
          <br />
          to a universe of Books{" "}
        </span>
      </div>
      <p className="subtitle">The Trio of BookTrackr Benefits </p>
      <div id="benefits">
        <div className="icons">
          <img src={icon1} />
          <p className="benTitle">Efficient Book Discovery</p>
          <p>
            Users can quickly find books based on titles, authors, genres, or
            keywords.{" "}
          </p>
        </div>
        <div className="icons">
          <img src={icon2} />
          <p className="benTitle">Personalized Reader Experience</p>
          <p>
            Users can track their reading progress, add reviews, and organize
            books into personalized wish lists, enhancing their overall reading
            journey.
          </p>
        </div>
        <div className="icons">
          <img src={icon3} />
          <p className="benTitle">User-Friendly Interface</p>
          <p>
            The application's simple navigation, and responsive layout make it
            easy for users to navigate through search results, view book
            details, and manage their reading preferences{" "}
          </p>
        </div>
      </div>
      <Element className={`listIcon ${isListInView ? "in-view" : ""}`} name="listIcon">
      <div className="wishlist">
        <div>
          <img src={wishlist} className="listIcon animate-on-scroll-icon"/>
        </div>
        <div className="listText animate-on-scroll">
          <p className="wishTitle">Share your Wish List</p>
          <p className="description">
            With this feature, you can share your wish list with friends, giving
            them valuable insights into your preferences and perhaps receiving
            one of your dream books as a thoughtful gift.
          </p>
        </div>
      </div>
      </Element>
      <div id="video">
        <p className="subtitle">Discover the Magic of BookTrackr </p>
        <p>A How-to Video</p>
        </div>
     <Element className={`video ${isVideoInView ? "in-view" : ""}`} name="video">
        <div className="videoWrapper"> 
        <iframe width="660" height="405" src="https://www.youtube.com/embed/HgqkapQIb6Y" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen></iframe>
        </div>
      </Element>
      <div className="end">
        <p className="endTitle">Encounter Your Next Great Reading</p>
        <p id="sign">
            {userId || username
              ? "Explore Your Wishlist and Discover More!"
              : "Sign Up Now and Explore the World of Books!"}
          </p>
          {userId || username ? (
            <button className="gradient-button" onClick={() => navigate("/wishlist")}>
              Explore Wishlist
            </button>
          ) : (
            <button className="gradient-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          )}
      </div>
    </div>
    </Card>
  );
}

export default Home;
