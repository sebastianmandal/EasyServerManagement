/*jshint esversion: 9 */
const {
  Permissions,
  Client,
  MessageEmbed
} = require("discord.js");

const adminPermissions = new Permissions('ADMINISTRATOR');

module.exports = {

  kick: (msg) => {
    const user = msg.mentions.users.first();

    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);

      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            // We let the message author know we were able to kick the person
            msg.reply(
              `Successfully kicked @${user.username}.`
            );
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            msg.reply("I was unable to kick the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        msg.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  ban: (msg) => {
    const user = msg.mentions.users.first();

    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);

      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .ban("Optional reason that will display in the audit logs")
          .then(() => {
            // We let the message author know we were able to kick the person
            msg.reply(
              `Successfully banned @${user.username}.`
            );
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            msg.reply("I was unable to ban the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        msg.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      msg.reply("You didn't mention a user or the mentioned user is invalid!");
    }
  },

  delete: (msg) => {
    const amount = parseInt(msg.content.slice(8));

    if (amount > 99) {
      msg.channel.send("Cannot delete more than 99 messages at once.");
    } else if (amount === 1) {
      msg.channel.bulkDelete(2);
    } else {
      msg.channel.bulkDelete(amount + 1);
    }
  },

  help: (msg) => {
    var commands = {
      ...require("./commands"),
    };
    // Sends embed containing Github, personal info, commands for bot, example, prefix, etc. in chat.
    const help_embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Sebastian Mandal > EasyServerManagement")
      .setDescription(
        "Click the link above to get redirected to my personal Github!"
      )
      .setURL("https://github.com/sebastianmandal/easyservermanagement")
      .setAuthor(
        "Sebastian Mandal",
        "https://i.imgur.com/PHqQPNm.jpg",
        "https://github.com/sebastianmandal"
      )
      .addFields({
        name: "Prefix",
        value: "> ! (exlamation)",
      }, {
        name: "Commands",
        value: [
          Object.keys(commands).join('\n')
        ],
      }, {
        name: "Example",
        value: "> !help",
      })
      .setTimestamp()
      .setFooter('Discord bot "EasyServerManagement", made by Sebastian Mandal.');

    msg.channel.send(help_embed);
  }
};