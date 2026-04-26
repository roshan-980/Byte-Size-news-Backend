const axios = require('axios')
const express = require('express')
const router = express.Router()
const { ElevenLabsClient, play } = require('@elevenlabs/elevenlabs-js');
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});
router.post('/', async (req, res) => {
  try {
    const { text, voiceid } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    const audioStream = await elevenlabs.textToSpeech.convert(
      voiceid || "JBFqnCBsd6RMkjVDRZzb",
      {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128"
      }
    );

    res.set("Content-Type", "audio/mpeg");

    // It's a Node.js Readable — just pipe it directly
    audioStream.pipe(res);

    audioStream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ error: "Stream failed" });
    });

  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ error: "External TTS failed" });
  }
});
// define the about route
router.get('/about', (req, res) => {
    res.send('About ai summary')
})

module.exports = router
