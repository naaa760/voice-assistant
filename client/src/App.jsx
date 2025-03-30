import { Link } from "react-router-dom";

function App() {
  return (
    <div className="landing-page">
      <header>
        <h1>Voice Assistant AI</h1>
        <p>Your personal AI assistant powered by voice interaction</p>
      </header>

      <main>
        <div className="features">
          <div className="feature">
            <h2>Voice-First Interaction</h2>
            <p>Communicate naturally using just your voice</p>
          </div>
          <div className="feature">
            <h2>Intelligent Responses</h2>
            <p>
              Powered by advanced AI to understand and respond to your needs
            </p>
          </div>
          <div className="feature">
            <h2>Seamless Experience</h2>
            <p>Natural conversation flow with minimal latency</p>
          </div>
        </div>

        <div className="cta">
          <Link to="/dashboard" className="dashboard-button">
            Go to Dashboard
          </Link>
        </div>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Voice Assistant AI</p>
      </footer>
    </div>
  );
}

export default App;
