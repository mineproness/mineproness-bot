import mineflayer, { createBot } from "mineflayer";
import express from 'express'
// import {} from "prismarine-viewer";
const setting = {
    "version": "1.21.11",
    "username": "minepronessBot",
    "auth": "offline",
    "host": "butterfish.aternos.host",
    "port": 32310,
}
let interval = null
let error = ""
const app = express()

app.get("/" , (req,res)=>{
  if(error.length == 0){
    res.send("The bot is running")
    
  }else{
    res.send(error)
  }
})
function CreateBot() {
  const bot = mineflayer.createBot(setting);
   
  bot.once("spawn", () => {
      app.listen(8080 , ()=>{
      })
    console.log("The player is spawned⛳");
    setInterval(() => {
      bot.chat("i like to play minecraft with zenith launcher");
      console.log("The Bot just give chat");
    }, 500000);
    interval = setInterval(()=>{
     bot.setControlState("jump" , true)
     bot.setControlState("jump" , false)
     
    } , 1500)
  });
  bot.addListener("end", (resson) => {
    console.log("error:",resson);
    error = resson
    clearInterval(interval)
    CreateBot();
  });
  bot.addListener("kicked", (resson)=>{
    error = resson
    clearInterval(interval)
    CreateBot()
  })
}

CreateBot()
