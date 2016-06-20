var Cleverbot = require('cleverbot-node');
var Discordbot = require("discord.js");
var config = require("./config.json")
var DBots = [new Discordbot.Client(),new Discordbot.Client(),new Discordbot.Client()]
var CBots = [new Cleverbot,new Cleverbot,new Cleverbot]
  , i = 0
  , callback = function callback(resp){
      setTimeout(function(str1, str2) {
//        DBots[i].startTyping(config.botChannel);
        CBots[i].write(resp['message'],callback);
        DBots[i = ( ( i + 1 ) %3)].sendMessage("194293716230471681", resp['message']);
      }, 2500);
//      DBots[i].stopTyping(config.botChannel);
    };
Cleverbot.prepare(function(){
  callback({message:config.startMessage})
});
DBots[0].on("ready", function(){
//  DBots[0].sendMessage(config.botChannel, config.startMessage);
});

DBots[0].loginWithToken(config.bot1);
DBots[1].loginWithToken(config.bot2);
DBots[2].loginWithToken(config.bot3)
