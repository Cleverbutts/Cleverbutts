var Cleverbot = require('cleverbot-node')
  , Discordbot = require("discord.js")
  , fs = require("fs")
  , config = require("./config.json")
  , DBots = []
  , CBots = []
  , randombot = Math.floor(Math.random() * (config.bots.length - 1))
  , newtext = undefined
  , lastMessage = "Hello there!"
  , voters = []
  , votes = 0;

for (var ii = 0; ii < config.bots.length; ii++) {
  DBots.push(new Discordbot.Client())
  CBots.push(new Cleverbot)
}

var i = 0, callback = function callback(resp) {
  setTimeout(function (str1, str2) {
    DBots[i].startTyping(config.botChannel);
    var toWrite = resp['message'];
  		if (newtext) {
      toWrite = newtext;
      newtext = undefined;
  		}
    CBots[i].write(toWrite, callback);

    DBots[i = ((i + 1) % DBots.length)].sendMessage(config.botChannel, toWrite);
  }, config.bot_speed);
  DBots[i].stopTyping(config.botChannel);
};

var commandsProcessed = 0, talkedToTimes = 0;

Cleverbot.prepare(function () {
  lastMessage = config.startMessage; callback({ message: config.startMessage })
});

DBots[i].on("message", (msg) => {
  if (!msg.content.startsWith(config.command_prefix)) return;
  if (msg.content.indexOf(" ") === 1 && msg.content.length > 2) msg.content = msg.content.replace(" ", "");
  let cmd = msg.content.split(" ")[0].substring(1).toLowerCase();
  let suffix = msg.content.substring(cmd.length + 2).trim();
  if (msg.content.startsWith(config.command_prefix)) {
  		if (commands.hasOwnProperty(cmd)) {
      if (!msg.channel.isPrivate)
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
        if (toSend.length >= 1990) {
          DBots[i].sendMessage(msg.author, toSend.substr(0, 1990).substr(0, toSend.substr(0, 1990).lastIndexOf('\n\t')) + "```"); //part 1
          setTimeout(() => { DBots[i].sendMessage(msg.author, "```glsl" + toSend.substr(toSend.substr(0, 1990).lastIndexOf('\n\t')) + "```"); }, 1000); //2
        } else DBots[i].sendMessage(msg.author, toSend + "```"); DBots[i].sendMessage(msg, "**" + msg.author.username + "** I have sent you help in PM 📬");
      } else {
        suffix = suffix.toLowerCase();
        if (commands.hasOwnProperty(suffix)) {
          toSend.push("`" + config.command_prefix + suffix + ' ' + commands[suffix].usage + "`");
          if (commands[suffix].hasOwnProperty("info")) toSend.push(commands[suffix].info); //if extra info
          else if (commands[suffix].hasOwnProperty("desc")) toSend.push(commands[suffix].desc); //else usse the desc
          DBots[i].sendMessage(msg, toSend);
        } else
          DBots[i].sendMessage(msg, "Command `" + suffix + "` not found.", (erro, wMessage) => { DBots[i].deleteMessage(wMessage, { "wait": 10000 }); });
      }
    }
  },
  "restart": {
    desc: "Restart the bots to say something different", usage: "<sentence|word>",
    process: function (DBots, msg, suffix) {
      if (msg.channel.permissionsOf(msg.author).hasPermission("manageServer")) {
        var nexttext = msg.content.substring(8).trim();
        CBots = [new Cleverbot, new Cleverbot, new Cleverbot, new Cleverbot];
        if (nexttext.length == 0) {
          nexttext = lastMessage;
        } else {
          lastMessage = nexttext;
        }
        newtext = nexttext;
      } else DBots[i].sendMessage(msg, "⚠ Access Denied `Permission Required - manageServer`");
    }
  },
  "checkhost": {
    desc: "Checks who is hosting", usage: "",
    process: function (DBots, msg, suffix) {
      DBots[i].sendMessage(msg.channel, config.host)
    }
  },
  "vote": {
    desc: "Vote to restart the bots", usage: "",
    process: function (DBots, msg, suffix) {
      if (votes == config.voteThreshold) {
        newtext = lastMessage;
        voters = [];
        votes = 0;
        CBots = [new Cleverbot, new Cleverbot, new Cleverbot, new Cleverbot];
        DBots[i].sendMessage(msg.channel, "Cleverbutts *should* be restarted.")
      }
      if (voters.includes(msg.sender.id)) {
        DBots[i].sendMessage(msg.channel, "You have already voted!")
      } else {
        var remainingvotes = config.voteThreshold - votes;
        voters.push(msg.sender.id);
        DBots[i].sendMessage(msg.channel, "**" + remainingvotes + "** more votes are required to restart.");
        ++votes
      }
    }
  },
  "shutdown": {
    desc: "Turns off the bots (and reboots if using script)", usage: "<sentence|word>",
    process: function (DBots, msg, suffix) {
      var startMSG = msg.content.substring(15, 2000).trim();
      if (startMSG.length == 0) {
        startMSG = lastMessage;
      } else {
        lastMessage = startMSG;
      }
      if (msg.channel.permissionsOf(msg.author).hasPermission("manageServer")) {
        if (startMSG != "") {
          fs.readFile("./config.json", "utf8", function (err, ctx) {
            var parts = ctx.split(config.startMessage)
            fs.writeFile("./config.json", parts[0] + startMSG + parts[1], function () {
              process.exit()
            });
          });
        }
        else {
          process.exit()
        }
      } else DBots[i].sendMessage(msg, "⚠ Access Denied `Permission Required - manageServer`");
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


/* IGNORE THIS PART IF YOU DON*T KNOW WHAT YOU'RE DOING */
var botNum = -1
for (var ii = 0; ii < DBots.length; ii++) {
  DBots[ii].on("ready", function () { botNum++; console.log("[info] Bot " + botNum + " logged in as " + DBots[botNum].user.name + "#" + DBots[botNum].user.discriminator + " (" + DBots[botNum].user.id + ")") });
  DBots[ii].loginWithToken(config.bots[ii]);
}

exports.commands = commands;
