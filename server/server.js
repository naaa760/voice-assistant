const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");
const { Deepgram } = require("@deepgram/sdk");
const fs = require("fs");
const { Readable } = require("stream");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Deepgram
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

// API Routes
// 1. Speech-to-Text endpoint
app.post("/api/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    // Create a readable stream from the buffer
    const audioStream = new Readable();
    audioStream.push(req.file.buffer);
    audioStream.push(null);

    // Send to Deepgram
    const response = await deepgram.transcription.preRecorded(
      {
        stream: audioStream,
        mimetype: req.file.mimetype,
      },
      {
        punctuate: true,
        model: "nova-2",
      }
    );

    // Extract the transcript
    const transcript = response.results.channels[0].alternatives[0].transcript;

    res.json({ transcript });
  } catch (error) {
    console.error("Error in speech-to-text:", error);
    res.status(500).json({ error: "Failed to process audio" });
  }
});

// 2. Chat endpoint (Groq API)
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful voice assistant. Provide concise, accurate responses.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// 3. Text-to-Speech endpoint
app.post("/api/text-to-speech", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Using ElevenLabs API for high-quality TTS
    // You can replace this with any TTS API of your choice
    const response = await axios({
      method: "post",
      url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      headers: {
        Accept: "audio/mpeg",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      responseType: "arraybuffer",
    });

    // Send the audio back to the client
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Error in text-to-speech:", error);
    res.status(500).json({ error: "Failed to convert text to speech" });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
