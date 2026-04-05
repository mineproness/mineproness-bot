import mineflayer from "mineflayer";
import express from "express";

let setting = {
  version: "1.21.11",
  username: "minepronessBot",
  auth: "offline",
  host: "billfish.aternos.host",
  port: 32310,
};

let interval = null;
let chatInterval = null;
let error = "";

const app = express();

// ✅ Start express ONLY ONCE
app.get("/", (req, res) => {
  res.send(error.length === 0 ? "The bot is running" : error);
});

app.get("/api/ip/:ip/:port", (req, res) => {
  const { ip, port } = req.params;
  setting.host = ip;
  setting.port = port;
  res.send("The IP and Port changed");
});

app.listen(8080, () => {
  console.log("Web server running");
});

function CreateBot() {
  const bot = mineflayer.createBot({
    ...setting,
    checkTimeoutInterval: 60000, // optional safety
  });

  bot.once("spawn", () => {
    console.log("The player is spawned ⛳");

    // ✅ clear old intervals if any
    if (interval) clearInterval(interval);
    if (chatInterval) clearInterval(chatInterval);

    // chat interval
    chatInterval = setInterval(() => {
      bot.chat("i like to play minecraft with zenith launcher");
    }, 500000);

    // jump interval
    interval = setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => {
        bot.setControlState("jump", false);
      }, 200);
    }, 1500);
  });

  bot.on("end", (reason) => {
    console.log("Disconnected:", reason);
    error = reason;

    cleanup();
    setTimeout(CreateBot, 5000); // ✅ delay reconnect
  });

  bot.on("kicked", (reason) => {
    console.log("Kicked:", reason);
    error = reason;

    cleanup();
    setTimeout(CreateBot, 5000);
  });

  function cleanup() {
    if (interval) clearInterval(interval);
    if (chatInterval) clearInterval(chatInterval);
  }
}

CreateBot();
