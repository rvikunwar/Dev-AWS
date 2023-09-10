const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");
const https = require("https");
const PORT = 9001;

app.use(bodyParser.json());

// Simulated payment webhook
app.post("/webhook", (req, res) => {
  console.log("=========================");
  console.log("Webhook called");
  console.log("=========================");
  res.status(200).send("Webhook received");
});


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
