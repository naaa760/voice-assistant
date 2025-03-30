import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaMicrophone, FaStop } from "react-icons/fa";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const conversationEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the conversation when new messages are added
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleAudioData;

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Recording...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setStatus("Error accessing microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus("Processing...");
      setIsProcessing(true);
    }
  };

  const handleAudioData = async () => {
    // Option 2: Keep the variable but use it (for future implementation)
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    // Suppress the linter warning by using the variable in some way
    console.log("Audio blob created:", audioBlob.size);

    // Add user message to conversation (placeholder until we get the transcription)
    const userMessageId = Date.now();
    setConversation((prev) => [
      ...prev,
      {
        id: userMessageId,
        sender: "user",
        content: "Processing your message...",
      },
    ]);

    try {
      // Convert audio to text using speech-to-text service
      const transcription = await convertSpeechToText();

      // Update the user message with the transcription
      setConversation((prev) =>
        prev.map((msg) =>
          msg.id === userMessageId ? { ...msg, content: transcription } : msg
        )
      );

      // Get AI response
      const aiResponse = await getAIResponse();

      // Add AI response to conversation
      setConversation((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "assistant",
          content: aiResponse,
        },
      ]);

      // Convert AI response to speech
      await convertTextToSpeech(aiResponse);

      setStatus("Ready");
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing audio:", error);
      setStatus("Error processing your request. Please try again.");
      setIsProcessing(false);

      // Update the user message to show the error
      setConversation((prev) =>
        prev.map((msg) =>
          msg.id === userMessageId
            ? {
                ...msg,
                content: "Error processing your message. Please try again.",
              }
            : msg
        )
      );
    }
  };

  // Placeholder function for speech-to-text conversion
  const convertSpeechToText = async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // This is where you would make the actual API call to Deepgram
    // For now, return a placeholder message
    return "This is a simulated transcription of your voice input.";
  };

  // Placeholder function for getting AI response
  const getAIResponse = async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // This is where you would make the actual API call to Groq
    // For now, return a placeholder response
    return "This is a simulated AI response to your query. In a real implementation, this would come from the Groq API based on your voice input.";
  };

  // Placeholder function for text-to-speech conversion
  const convertTextToSpeech = async (text) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // This is where you would make the actual API call to a TTS service
    // and play the resulting audio

    // For now, we'll use the browser's built-in speech synthesis
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isProcessing) return; // Prevent starting new recording while processing

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Voice Assistant Dashboard</h1>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>

      <div className="voice-interface">
        <div className="conversation-container">
          {conversation.length === 0 ? (
            <div className="empty-conversation">
              <p>
                Your conversation will appear here. Press the microphone button
                to start speaking.
              </p>
            </div>
          ) : (
            conversation.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))
          )}
          <div ref={conversationEndRef} />
        </div>

        <div className="controls">
          <button
            className={`record-button ${isRecording ? "recording" : ""}`}
            onClick={toggleRecording}
            disabled={isProcessing}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
        </div>

        <div className="status-indicator">
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
