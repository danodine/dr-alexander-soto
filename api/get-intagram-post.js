import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config.js";

const app = express();
app.use(cors());

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

app.get("/api/instagram/latest", async (req, res) => {
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&access_token=${INSTAGRAM_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({ error: "No media found" });
    }

    const latest = data.data[0]; // first = latest
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching Instagram media" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
