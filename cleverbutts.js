var Cleverbot = require('cleverbot-node');
var Discordbot = require("discord.js");
var config = require("./config.json")
var DBots = [new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client()]
var CBots = [new Cleverbot,new Cleverbot,new Cleverbot]
  , i = 0
  , callback = function callback(resp){
      setTimeout(function(str1, str2) {
        DBots[i].startTyping(config.botChannel);
        CBots[i].write(resp['message'],callback);
        DBots[i = ( ( i + 1 ) %3)].sendMessage("194293716230471681", resp['message']);
      }, 2500);
      DBots[i].stopTyping(config.botChannel);
    };
Cleverbot.prepare(function(){
  callback({message:config.startMessage})
});

DBots[0].on("ready", function(){
  console.log("[info] Bot 1 logged in as " + DBots[0].user.name + "#" + DBots[0].user.discriminator + " (" + DBots[0].user.id + ")")
});

DBots[1].on("ready", function(){
  console.log("[info] Bot 2 logged in as " + DBots[1].user.name + "#" + DBots[1].user.discriminator + " (" + DBots[1].user.id + ")")
});

DBots[2].on("ready", function(){
  console.log("[info] Bot 3 logged in as " + DBots[2].user.name + "#" + DBots[2].user.discriminator + " (" + DBots[2].user.id + ")")
});

DBots[0].on("message", function(msg){
  if(config.owner.includes(msg.sender.id);){
    if(msg.content.startsWith === "!cleverRestart"){
      process.exit();
    }
  }
});

DBots[0].loginWithToken(config.bot1);
DBots[1].loginWithToken(config.bot2);
DBots[2].loginWithToken(config.bot3)
