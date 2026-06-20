require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;

  console.log("Command:", interaction.commandName);

  if (interaction.commandName === "play34") {

    const fs = require("fs");

    console.log(
      "File exists:",
      fs.existsSync("./audio/34.mp3")
    );

    return interaction.reply(
      "Check Railway logs"
    );
  }

});

client.login(process.env.TOKEN);
