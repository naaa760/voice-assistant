import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaMicrophone, FaStop } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const conversationEndRef = useRef(null);

  useEffect(() => {
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

      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleAudioData = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    console.log("Audio blob created:", audioBlob.size);

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
      // Convert audio to text using Deepgram
      const transcription = await convertSpeechToText(audioBlob);

      // Update the user message with the transcription
      setConversation((prev) =>
        prev.map((msg) =>
          msg.id === userMessageId ? { ...msg, content: transcription } : msg
        )
      );

      // Get AI response from Groq
      const aiResponse = await getAIResponse(transcription);

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

  // Real implementation of speech-to-text using Deepgram
  const convertSpeechToText = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      // Send the audio to our backend proxy
      const response = await axios.post(
        `${API_URL}/api/speech-to-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        }
      );

      if (response.data && response.data.transcript) {
        return response.data.transcript;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error in speech-to-text conversion:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
      throw new Error(
        "Failed to convert speech to text. " + (error.message || "")
      );
    }
  };

  // Real implementation of AI response using Groq
  const getAIResponse = async (text) => {
    try {
      const response = await axios.post("/api/chat", {
        message: text,
      });

      return response.data.response;
    } catch (error) {
      console.error("Error getting AI response:", error);
      throw new Error("Failed to get AI response");
    }
  };

  // Enhanced text-to-speech conversion
  const convertTextToSpeech = async (text) => {
    try {
      // Get audio from TTS API
      const response = await axios.post(
        "/api/text-to-speech",
        {
          text: text,
        },
        {
          responseType: "blob",
        }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      await audio.play();

      // Clean up the URL object after playing
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error("Error in text-to-speech conversion:", error);

      // Fallback to browser's built-in speech synthesis
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const toggleRecording = () => {
    if (isProcessing) return;

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
