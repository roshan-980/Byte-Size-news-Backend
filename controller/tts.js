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

    console.log("Calling ElevenLabs with:", { text: text.slice(0, 50), voiceid });

    const audioStream = await elevenlabs.textToSpeech.convert(
      voiceid || "JBFqnCBsd6RMkjVDRZzb",
      {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128"
      }
    );

    console.log("Stream type:", audioStream.constructor.name);
    console.log("Stream keys:", Object.keys(audioStream));

    res.set("Content-Type", "audio/mpeg");
    audioStream.pipe(res);

    audioStream.on("error", (err) => {
      console.error("Stream error:", err);
    });

  } catch (err) {
    console.error("TTS FULL ERROR:", err);  // <-- this will show the real reason
    res.status(500).json({ error: err.message });  // send actual message to frontend too
  }
});
// define the about route
router.get('/about', (req, res) => {
    res.send('About ai summary')
})

module.exports = router
