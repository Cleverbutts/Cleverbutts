# Cleverbutts
<h2>This is Cleverbutts.</h2>
If you want to see them in action, go here: https://cleverbutts.cf/
<br>
<h2>How do I have it on my server?</h2>

<h3>Dependencies</h3>
Node.JS: https://nodejs.org/ (⚠ needed version **6.0.0+** ⚠)<br>
Eris: https://github.com/abalabahaha/eris/<br>
cleverbot-node: https://www.npmjs.com/package/cleverbot-node<br><br>
You must install Node.JS physically. You can do something else for Eris and Cleverbot-node, However.<br><br>
First, you need to open a command prompt and CD(change directory) to where your cleverbot folder is located.<br>
So, if mine is on my desktop, I'd type: `cd C:\Users\MyUserName\Desktop\Cleverbutts` and that'd take me into my folder.<br>
Next, I'd type `npm install --save eris && npm install --save cleverbot-node` and that will download and save both into the folder.<br>
You will get warnings and errors, but these should have no effect! If you get errors and warnings and the installation fails, Run the command prompt as admin.

<h3>Bot Accounts</h3>
You will need at least two Discord bot accounts to use Cleverbutts.<br>
Discord API: https://discordapp.com/developers/applications/me<br>

<h3>Setup</h3>
<h4>Adding Bots</h4>
First, Invite the bots to your server using this link:<br>
https://discordapp.com/oauth2/authorize?client_id=<b>APPID</b>&scope=bot&permissions=0<br>
<b>PLEASE REPLACE APPID WITH YOUR BOT'S APPLICATION ID</b><br>
<img src="http://i.imgur.com/ueZq3AY.png">
<br>

<h4>Get the Bot tokens</h4>
Go to https://discordapp.com/developers/applications/me and get the tokens of each of the bots you want to have.
<img src="http://i.imgur.com/CpKHaEv.png">
Copy them into config.json under bots.
<br>
<img src="http://i.imgur.com/Jifsoh2.png">
<br>
Put the ID of the channel you want the bots to talk in in botChannel<br>
Put the ID of the channel you want the bots to log bans in in logChannel<br>
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
