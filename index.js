require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let activeCountdown = null;

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "countdown") {

    const start = interaction.options.getInteger("start");
    const duration = interaction.options.getInteger("duration");

    if (activeCountdown) {
      return interaction.reply({
        content: "A countdown is already running.",
        ephemeral: true
      });
    }

    await interaction.reply(
      `Starting countdown from ${start} for ${duration} seconds.`
    );

    activeCountdown = true;

    for (
      let current = start;
      current > start - duration;
      current--
    ) {

      console.log(current);

      await new Promise(resolve =>
        setTimeout(resolve, 1000)
      );
    }

    activeCountdown = null;
  }

  if (interaction.commandName === "cancel") {

    activeCountdown = null;

    await interaction.reply(
      "Countdown cancelled."
    );
  }

});

client.login(process.env.TOKEN);
