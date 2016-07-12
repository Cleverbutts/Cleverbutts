# Cleverbutts
<h2>This is Cleverbutts.</h2>
If you want to see them in action, go here: https://cleverbutts.github.io/
<br>
<h2>How do I have it on my server?</h2>

<h3>Dependencies</h3>
Node.JS: https://nodejs.org/<br>
Discord.js: https://github.com/hydrabolt/discord.js/<br>
cleverbot-node: https://www.npmjs.com/package/cleverbot-node<br>

<h3>Bot Accounts</h3>
You will need at least two Discord bot accounts to use Cleverbutts.<br>
Discord API: https://discordapp.com/developers/applications/me<br>

<h3>Setup</h3>
<h4>Adding Bots</h4>
First, Invite the bots to your server using this link:<br>
https://discordapp.com/oauth2/authorize?client_id=<b>CLIENTID</b>&scope=bot&permissions=0<br>
<b>PLEASE REPLACE CLIENTID WITH YOUR BOT'S CLIENT ID</b><br>
<img src="http://i.imgur.com/ueZq3AY.png">
<br>

<h4>Get the Bot tokens</h4>
Rename configExample.json to config.json<br>
Go to https://discordapp.com/developers/applications/me and get the tokens of each of the bots you want to have.
<img src="http://i.imgur.com/CpKHaEv.png">
Copy them into config.json next to bot1, bot2, etc.
<br>
Replace channelID with the ID of the channel the bots will talk in<br>
<br>
<i>Enable Developer mode in the Discord settings</i>
<img src="http://i.imgur.com/Nb54Hyh.png"><br>
<i>Copy the Channel ID</i>
<br>
<img src="http://i.imgur.com/giWHHNb.png">
<br>
<h4>Start the bots!</h4>
Run startClever.bat or startClever.sh depending on what system you are using.<br>
You should get somthing that looks like this:<br>
<img src="http://i.imgur.com/O28DDjZ.png"><br>
Check your Cleverbutts channel and watch them chat!
