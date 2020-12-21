/*jshint esversion: 9 */

const {
  Client,
  MessageEmbed
} = require("discord.js");

const client = new Client();

// To use my json parser. I have my token stored in auth.json, so it would be harder (if it's even possible) to crack my token
const fs = require("fs-extra");
const filepath = require("path");

// self explanatory
var prefix = "?";
var commands = {
  ...require("./modules/guild management"),
  ...require("./modules/member management"),
  ...require("./modules/info"),
  ...require("./modules/fun")
};

// silenced channels
var SILENCED = [];

// just a simple log for when the bot goes online
client.once("ready", () => {
  console.log("EasyServerManagement is ready!");
  client.user.setActivity("?help", {
    type: "PLAYING",
  });
});

// Command processor
client.on("message", (msg) => {
  if (!msg.author.bot) { 
    if (msg.content.includes("iirc")) {
      msg.channel.send("iirc = 'if I recall correctly' (you're welcome, future Seb)");
    } 
  }

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (
    // if the person is a bot, the command doesn't start with a prefix, the person doesn't have administrator right or it's a dm, it should return.
    !msg.content.startsWith(prefix) ||
    msg.channel.type === "dm" ||
    msg.author.bot ||
    !msg.member.hasPermission("ADMINISTRATOR")
  ) {
    if (msg.content.startsWith(prefix)) {
      if (command != "help") {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.reply("Unable to send command. You are not an administrator.");
          return;
        }
      }
    } else {
      return;
    }
  }

  try {
    // this is the command processor, it will go through all of my commands and look for a match
    commands[
      Object.keys(commands).find(
        (key) => msg.content.trim().substr(1).split(/ +/)[0] === key
      )
    ](msg, prefix);
  } catch (err) {
    return; // this is here temporarily
    // !(err instanceof TypeError) && log(err);
  }
});

// Joining the server
token = {
  ...require('./token')
}

client.login(token.token);

module.exports = {
  prefix: prefix
};