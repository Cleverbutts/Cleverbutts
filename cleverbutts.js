var Cleverbot = require('cleverbot-node');
var Discordbot = require("discord.js");
var fs = require("fs")
var config = require("./config.json")
var availableAccounts = 0
var DBots = [new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client()]
var CBots = [new Cleverbot,new Cleverbot,new Cleverbot,new Cleverbot,new Cleverbot]
  , i = 0
  , callback = function callback(resp){
      setTimeout(function(str1, str2) {
        DBots[i].startTyping(config.botChannel);
        CBots[i].write(resp['message'],callback);
        DBots[i = ( ( i + 1 ) % availableAccounts)].sendMessage(config.botChannel, resp['message']);
      }, 2500);
      DBots[i].stopTyping(config.botChannel);
    };

Cleverbot.prepare(function(){
  callback({message:thing})
});

var things = config.startMessages

var thing = things[Math.floor(Math.random()*things.length)];

DBots[0].on("ready", function(){
  availableAccounts++
  console.log("[info] Bot 1 logged in as " + DBots[0].user.name + "#" + DBots[0].user.discriminator + " (" + DBots[0].user.id + ")")
});

DBots[1].on("ready", function(){
  availableAccounts++
  console.log("[info] Bot 2 logged in as " + DBots[1].user.name + "#" + DBots[1].user.discriminator + " (" + DBots[1].user.id + ")")
});

DBots[2].on("ready", function(){
  availableAccounts++
  console.log("[info] Bot 3 logged in as " + DBots[2].user.name + "#" + DBots[2].user.discriminator + " (" + DBots[2].user.id + ")")
});

DBots[3].on("ready", function(){
  availableAccounts++
  console.log("[info] Bot 4 logged in as " + DBots[3].user.name + "#" + DBots[3].user.discriminator + " (" + DBots[3].user.id + ")")
});

DBots[4].on("ready", function(){
  availableAccounts++
  console.log("[info] Bot 5 logged in as " + DBots[4].user.name + "#" + DBots[4].user.discriminator + " (" + DBots[4].user.id + ")")
});

DBots[0].loginWithToken(config.bot1);
DBots[1].loginWithToken(config.bot2);
DBots[2].loginWithToken(config.bot3);
DBots[3].loginWithToken(config.bot4);
DBots[4].loginWithToken(config.bot5);
