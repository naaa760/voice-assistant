import { Link } from "react-router-dom";
import { FaMicrophone, FaRobot, FaBolt, FaGlobe } from "react-icons/fa";

function App() {
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

      <section id="features" className="features-section">
        <h2>Powerful Voice AI at Your Fingertips</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaMicrophone />
            </div>
            <h3>Voice-First Interaction</h3>
            <p>
              Communicate naturally using just your voice, no typing needed.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaRobot />
            </div>
            <h3>Advanced AI Responses</h3>
            <p>
              Powered by state-of-the-art language models for intelligent
              conversations.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaBolt />
            </div>
            <h3>Lightning Fast</h3>
            <p>
              Get responses in seconds with our optimized processing pipeline.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaGlobe />
            </div>
            <h3>Natural Voice Output</h3>
            <p>Hear responses in a natural-sounding voice that feels human.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Speak Your Question</h3>
            <p>Press the microphone button and speak naturally.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Processing</h3>
            <p>Your voice is converted to text and processed by our AI.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Listen to Response</h3>
            <p>Hear the AI's response in a natural-sounding voice.</p>
          </div>
        </div>
        <div className="cta-container">
          <Link to="/dashboard" className="cta-button">
            Try It Yourself
          </Link>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Voice Assistant AI</h2>
        <p>
          Our voice assistant uses cutting-edge technology to create a seamless
          voice-first experience. Powered by Deepgram for speech recognition,
          Groq for AI processing, and ElevenLabs for natural voice synthesis, we
          deliver a truly conversational AI experience.
        </p>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <FaRobot className="logo-icon" />
            <span>VoiceAI</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Voice Assistant AI. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
