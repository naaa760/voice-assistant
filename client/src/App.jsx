import { Link } from "react-router-dom";
import { FaMicrophone, FaRobot, FaBolt, FaGlobe } from "react-icons/fa";
import { useEffect, useRef } from "react";
import Carousel from "./components/Carousel";

function App() {
  const videoRef = useRef(null);

  // Update the image paths to match your logo images
  const carouselImages = [
    "/img.png",
    "/img1.png",
    "/img2.png",
    "/img3.png",
    "/img4.png",
    "/img5.png",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const videoCard = document.querySelector(".video-card");

      if (videoCard) {
        const videoCardTop =
          videoCard.getBoundingClientRect().top + window.scrollY;

        // Start playing video when it comes into view
        if (scrollPosition > videoCardTop - window.innerHeight / 2) {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div className="background-image"></div>

      <nav className="navbar">
        <div className="navbar-logo">
          <FaRobot className="logo-icon" />
          <span>VoiceAI</span>
        </div>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <Link to="/dashboard" className="nav-button">
            Dashboard
          </Link>
          <Link to="/dashboard" className="get-started-button">
            Get started <span className="arrow">→</span>
          </Link>
        </div>
      </nav>

      <div className="badge-container">
        <div className="badge">
          <span>#1 AI VOICE ASSISTANT FOR BUSINESS</span>
          <span className="info-icon">ⓘ</span>
        </div>
      </div>

      <header className="hero">
        <div className="hero-content">
          <h1>
            Turn <span className="text-dark">text to voice,</span>
            <br />
            in <span className="text-blue">seconds.</span>
          </h1>
          <p className="hero-subtitle">
            Create natural conversations with AI using just your voice. It's as
            easy as talking to a friend.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="primary-button">
              Create free AI voice <span className="arrow">→</span>
            </Link>
          </div>
          <div className="hero-info">
            <span>No credit card required</span>
            <div className="rating">
              <span className="rating-icon">★</span>
              Rated 4.7/5 on G2
            </div>
          </div>
        </div>
      </header>

      {/* Video Card Section */}
      <section className="video-card-section">
        <div className="video-card">
          <video
            ref={videoRef}
            src="/vid.mp4"
            muted
            loop
            playsInline
            className="card-video"
          ></video>
          <div className="card-content">
            <h2>Turn text to video, in minutes.</h2>
            <p>
              Create studio-quality videos with AI avatars and voiceovers in
              140+ languages. It's as easy as making a slide deck.
            </p>
            <Link to="/dashboard" className="card-button">
              Create free AI video <span className="arrow">→</span>
            </Link>
            <div className="card-info">
              <span>No credit card required</span>
              <div className="rating">
                <span className="rating-icon">★</span>
                Rated 4.7/5 on G2
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Update the carousel section */}
      <section className="carousel-section">
        <Carousel images={carouselImages} />
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-header">
          <h2>You don't have to choose between cost, time, and quality</h2>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-logo">
              <FaMicrophone />
            </div>
            <div className="stat-value">
              <span className="stat-arrow down">↓</span>$10K
            </div>
            <div className="stat-label">PER VIDEO</div>
            <p className="stat-description">
              Our AI voice technology reduced video production costs by $10,000
              per training video compared to traditional recording methods.
            </p>
            <Link to="/case-study" className="stat-link">
              Read case study <span className="arrow">→</span>
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-logo">
              <FaBolt />
            </div>
            <div className="stat-value">
              <span className="stat-arrow up">↑</span>90%
            </div>
            <div className="stat-label">TIME SAVINGS</div>
            <p className="stat-description">
              Cut 90% off video generation time – from days to hours, compared
              to traditional video creation methods.
            </p>
            <Link to="/case-study" className="stat-link">
              Read case study <span className="arrow">→</span>
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-logo">
              <FaRobot />
            </div>
            <div className="stat-value">
              <span className="stat-arrow up">↑</span>30%
            </div>
            <div className="stat-label">ENGAGEMENT INCREASE</div>
            <p className="stat-description">
              Experienced over 30% increase in engagement with AI-powered voice
              content compared to text-based learning modules.
            </p>
            <Link to="/case-study" className="stat-link">
              Read case study <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
