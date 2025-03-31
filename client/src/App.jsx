import { Link } from "react-router-dom";
import {
  FaMicrophone,
  FaRobot,
  FaBolt,
  FaGlobe,
  FaUserTie,
  FaChartBar,
  FaSearch,
  FaCode,
  FaBullhorn,
  FaHeadset,
  FaClock,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";
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
            <img
              src="/li2.png"
              alt="Cost Reduction"
              className="stat-card-image"
            />
            <div className="stat-card-content">
              <div className="stat-logo">
                <FaMicrophone />
              </div>
              <div className="stat-value">↓$10K</div>
              <div className="stat-label">PER VIDEO</div>
              <p className="stat-description">
                Our AI voice technology reduced video production costs by
                $10,000 per training video compared to traditional recording
                methods.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <img
              src="/li2.png"
              alt="Time Savings"
              className="stat-card-image"
            />
            <div className="stat-card-content">
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
            </div>
          </div>

          <div className="stat-card">
            <img
              src="/li2.png"
              alt="Engagement Increase"
              className="stat-card-image"
            />
            <div className="stat-card-content">
              <div className="stat-logo">
                <FaRobot />
              </div>
              <div className="stat-value">
                <span className="stat-arrow up">↑</span>30%
              </div>
              <div className="stat-label">ENGAGEMENT INCREASE</div>
              <p className="stat-description">
                Experienced over 30% increase in engagement with AI-powered
                voice content compared to text-based learning modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Section - styled like Stats Section */}
      <section className="professionals-section stats-style">
        <div className="stats-header">
          <h2>Built for professionals.</h2>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-logo">
              <FaUserTie />
            </div>
            <h3>Entrepreneur</h3>
            <div className="feature-content">
              <h4>Market intelligence navigator</h4>
              <p className="stat-description">
                Executes competitor analysis and tracks market trends to
                generate actionable reports.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-logo">
              <FaChartBar />
            </div>
            <h3>Analyst</h3>
            <div className="feature-content">
              <h4>Strategic thinking companion</h4>
              <p className="stat-description">
                Analyzes business challenges and identifies key information to
                generate strategic solutions.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-logo">
              <FaFileAlt />
            </div>
            <h3>Researcher</h3>
            <div className="feature-content">
              <h4>Smart document analyzer</h4>
              <p className="stat-description">
                Extracts key points from contracts and reports while
                highlighting critical details.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-logo">
              <FaEnvelope />
            </div>
            <h3>Developer</h3>
            <div className="feature-content">
              <h4>Context-aware email assistant</h4>
              <p className="stat-description">
                Extracts email essentials and generates contextual response
                suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* After Professionals Section */}
      <section className="test-platform-section">
        <div className="platform-container">
          <div className="platform-content">
            <h2>Intelligent Test Generation Platform</h2>

            <div className="platform-highlight">
              <p>
                You're developing an AI solution that automatically generates
                comprehensive test coverage.
              </p>
            </div>

            <div className="platform-features">
              <div className="feature-item">
                <span className="feature-icon">↳</span>
                <div className="feature-text">
                  <h3>Language-Agnostic Environments</h3>
                  <p>Deploy your AI across various programming languages.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">↳</span>
                <div className="feature-text">
                  <h3>Development Tool Integrations</h3>
                  <p>
                    Leverage IDE and language server connections for precise
                    code analysis.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">↳</span>
                <div className="feature-text">
                  <h3>Test Coverage Evaluations</h3>
                  <p>
                    Quantify the comprehensiveness and effectiveness of your
                    AI-generated tests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="platform-graph">
            <div className="graph-header">
              <h3>Coverage Over Time</h3>
              <span className="coverage-percentage">89%</span>
            </div>
            <div className="graph-content">
              {/* Graph line visualization would go here */}
            </div>
            <div className="graph-runs">
              <span className="run-label">Run #1</span>
              <span className="run-label">Run #2</span>
              <span className="run-label">Run #3</span>
              <span className="run-label">Run #4</span>
              <span className="run-label">Run #5</span>
              <span className="run-label">Run #6</span>
            </div>
            <div className="graph-bars">
              <div className="bar-group">
                <div className="bar-value">368</div>
              </div>
              <div className="bar-group">
                <div className="bar-value">322</div>
              </div>
              <div className="bar-group">
                <div className="bar-value">46</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
