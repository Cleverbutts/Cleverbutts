var Cleverbot = require('cleverbot-node')
  , Eris = require('eris')
  , fs = require("fs")

  var configPATH
      if(process.platform === "win32") {
        configPATH = process.env.APPDATA + '\\cbconfig.json' || (process.platform == 'darwin' ? process.env.HOME + 'Library/Application Support/cbconfig.json' : '/var/local/cbconfig.json')`${process.env.USERPROFILE}/Documents/Cleverbutts/config.json`
      } else {
        configPATH = process.env.APPDATA + '\\cbconfig.json' || (process.platform == 'darwin' ? process.env.HOME + 'Library/Application Support/cbconfig.json' : '/var/local/cbconfig.json')`${process.env.HOME}/Documents/Cleverbutts/config.json`
      }

var config = JSON.parse(fs.readFileSync(configPATH, "utf8"))
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
    CBots[ii].configure({botapi: "Cleverbutts-GUI-" + config.botChannel});
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

DBots[i].on("messageCreate", (msg) => {
  if (!msg.content.startsWith(config.command_prefix)) return;
  if (msg.content.indexOf(" ") === 1 && msg.content.length > 2) msg.content = msg.content.replace(" ", "");
  let cmd = msg.content.split(" ")[0].substring(1).toLowerCase();
  let suffix = msg.content.substring(cmd.length + 2).trim();
  if (msg.content.startsWith(config.command_prefix)) {
    if (commands.hasOwnProperty(cmd)) {
      if (!(msg.channel instanceof Eris.PrivateChannel))
        execCommand(msg, cmd, suffix);
    }
  }
});

/* COMMANDS | START */
var commands = {
  "help": {
    desc: "Sends a PM with all commands that can be used",
    usage: "[command]",
    deleteCommand: true, shouldDisplay: false, cooldown: 1,
    process: function (DBots, msg, suffix) {
      if (msg.channel.guild.id == DBots[i].channelGuildMap[config.botChannel]) {
        let toSend = [];
        if (!suffix) {
          toSend.push("Use `" + config.command_prefix + "help <command name>` to get more info on a command.\n");
          toSend.push("**Commands:**");
          toSend.push("```glsl\n");
          Object.keys(commands).forEach(cmd => {
            if (!commands[cmd].hasOwnProperty("shouldDisplay") || (commands[cmd].hasOwnProperty("shouldDisplay") && commands[cmd].shouldDisplay))
              toSend.push("\n" + config.command_prefix + cmd + " " + commands[cmd].usage + "\n\t#" + commands[cmd].desc);
          });
          toSend = toSend.join('');
          DBots[i].getDMChannel(msg.author.id).then(pc => {
            if (toSend.length >= 1990) {
              DBots[i].createMessage(pc.id, toSend.substr(0, 1990).substr(0, toSend.substr(0, 1990).lastIndexOf('\n\t')) + "```"); //part 1
              setTimeout(() => { DBots[i].createMessage(pc.id, "```glsl" + toSend.substr(toSend.substr(0, 1990).lastIndexOf('\n\t')) + "```"); }, 1000); //2
            } else DBots[i].createMessage(pc.id, toSend + "```"); DBots[i].createMessage(msg.channel.id, "**" + msg.author.username + "** I have sent you help in PM 📬");
          })
        } else {
          suffix = suffix.toLowerCase();
          if (commands.hasOwnProperty(suffix)) {
            toSend.push("`" + config.command_prefix + suffix + ' ' + commands[suffix].usage + "`");
            if (commands[suffix].hasOwnProperty("info")) toSend.push(commands[suffix].info); //if extra info
            else if (commands[suffix].hasOwnProperty("desc")) toSend.push(commands[suffix].desc); //else usse the desc
            DBots[i].createMessage(msg.channel.id, toSend);
          } else
            DBots[i].createMessage(msg.channel.id, "Command `" + suffix + "` not found.").then(wMessage => {
              setTimeout(() => {
                DBots[i].deleteMessage(wMessage.channel.id, wMessage.id);
              }, 10000)
            });
        }
      }
    }
  },
  "restart": {
    desc: "Restart the bots to say something different", usage: "<sentence|word>",
    process: function (DBots, msg, suffix) {
      if (msg.channel.permissionsOf(msg.author.id).json["manageGuild"]) {
        var nexttext = msg.content.substring(8).trim();
        CBots = new Array();
        for (var ii = 0; ii < DBots.length; ii++) {
          CBots.push(new Cleverbot);
        }
        if (nexttext.length == 0) {
          nexttext = lastMessage;
        } else {
          lastMessage = nexttext;
        }
        newtext = nexttext;
      } else DBots[i].createMessage(msg.channel.id, "⚠ Access Denied `Permission Required - manageServer`");
    }
  },
  "checkhost": {
    desc: "Checks who is hosting", usage: "",
    process: function (DBots, msg, suffix) {
      DBots[i].createMessage(msg.channel.id, config.host)
    }
  },
  "vote": {
    desc: "Vote to restart the bots", usage: "",
    process: function (DBots, msg, suffix) {
	  if (!config.restartVote) return;
      if (votes == config.voteThreshold) {
        newtext = lastMessage;
        voters = [];
        votes = 0;
        CBots = new Array();
        for (var ii = 0; ii < DBots.length; ii++) {
          CBots.push(new Cleverbot);
        }
        DBots[i].createMessage(msg.channel.id, "Cleverbutts *should* be restarted.")
      }
      if (voters.includes(msg.author.id)) {
        DBots[i].createMessage(msg.channel.id, "You have already voted!")
      } else {
        var remainingvotes = config.voteThreshold - votes;
        voters.push(msg.author.id);
        //console.log(i)
        DBots[i].createMessage(msg.channel.id, "**" + remainingvotes + "** more votes are required to restart.");
        ++votes
      }
    }
  }
}

/* COMMANDS | END */


function execCommand(msg, cmd, suffix, type = "normal") {
  try {
    commandsProcessed += 1;
    if (type == "normal") {
      commands[cmd].process(DBots, msg, suffix);
    }
  } catch (err) { console.log(err.stack); }
}

//I wonder if i'll actually add this.
/*
DBots[i].on("guildBanAdd", function (guild, user) {
  if (config.hasOwnProperty('logChannel')) {
    if (guild.id === DBots[i].guilds.get(DBots[i].channelGuildMap[config.logChannel]).id) {
      DBots[i].createMessage(config.logChannel, "🔨 " + user.username
        + "#" + user.discriminator + " (" + user.id + ") was banned.")
    }
  }
})

DBots[i].on("guildBanRemove", function (guild, user) {
  if (config.hasOwnProperty('logChannel')) {
    if (guild.id === DBots[i].guilds.get(DBots[i].channelGuildMap[config.logChannel]).id) {
      DBots[i].createMessage(config.logChannel, "🍪 " + user.username
        + "#" + user.discriminator + " (" + user.id + ") was unbanned.")
    }
  }
})
*/

exports.commands = commands;
