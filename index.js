require("dotenv").config();

const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (!interaction.isChatInputCommand()) return;

    console.log("Command received:", interaction.commandName);

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  } catch (error) {
    console.error("Interaction Error:", error);
  }
});

client.login(process.env.TOKEN);
