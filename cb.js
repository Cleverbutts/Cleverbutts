var Cleverbot = require('cleverbot-node')
  , Eris = require('eris')
  , fs = require("fs")
  , config = JSON.parse(fs.readFileSync("./config.json", "utf8"))
  , DBots = []
  , CBots = []
  , randombot = Math.floor(Math.random() * (config.bots.length - 1))
  , newtext = undefined
  , lastMessage = "Hello there!"
  , voters = []
  , votes = 0
  , die = false;

function loadBots(){
  var botNum = 0
  for (var ii = 0; ii < config.bots.length; ii++) {
    DBots.push(new Eris.Client("Bot " + config.bots[ii]))
    DBots[ii].on("ready", function () {
      if (++botNum == DBots.length) {
        ready()
      }
    });
    DBots[ii].connect();
    CBots.push(new Cleverbot)
  }
}

function ready() {
  for (var ii = 0; ii < DBots.length; ii++) {
    console.log("[info] Bot " + ii + " logged in as " + DBots[ii].user.username
      + "#" + DBots[ii].user.discriminator + " (" + DBots[ii].user.id + ")");
  }
  var button2start = document.getElementById("start")
  button2start.style["background-color"] = "#00FF00"
  button2start.innerHTML = "Start"
}

var talkbots

var i = 0, callback = function callback(resp) {
  talkbots = setTimeout(function (str1, str2) {
    var toWrite = resp['message'];
    if (newtext) {
      toWrite = newtext;
      newtext = undefined;
    }
    if(die) {
      return false;
      //i don't know how to stop this help
    } else {
      DBots[i].sendChannelTyping(config.botChannel);
      CBots[i].write(toWrite, callback);
      DBots[i = ((i + 1) % DBots.length)].createMessage(config.botChannel, toWrite).catch(err => console.log(err.stack));
    }
  }, config.bot_speed);
};

function start() {
  Cleverbot.prepare(function () {
    lastMessage = config.startMessage; callback({ message: config.startMessage })
  });
  var button2start = document.getElementById("start")
  button2start.style["background-color"] = "#ff0000"
  button2start.innerHTML = "Stop"
  die = false
}

function stop() {
  die = true
  var button2start = document.getElementById("start")
  button2start.style["background-color"] = "#00FF00"
  button2start.innerHTML = "Start"
}
