require("dotenv").config();

const {
Client,
GatewayIntentBits,
Events
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds
]
});

let activeCountdown = false;

client.once(Events.ClientReady, c => {
console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

if (!interaction.isChatInputCommand()) return;

if (interaction.commandName === "countdown") {

if (activeCountdown) {
  return interaction.reply({
    content: "A countdown is already running.",
    ephemeral: true
  });
}

const start = interaction.options.getInteger("start");
const end = interaction.options.getInteger("end");

if (start <= end) {
  return interaction.reply({
    content: "Start must be greater than end.",
    ephemeral: true
  });
}

activeCountdown = true;

await interaction.reply({
  content: `Starting countdown from ${start} to ${end}`,
  ephemeral: true
});

for (let i = start; i >= end; i--) {

  if (!activeCountdown) {
    break;
  }

  await interaction.channel.send({
    content: String(i),
    tts: true
  });

  await new Promise(resolve =>
    setTimeout(resolve, 1000)
  );
}

activeCountdown = false;

}

if (interaction.commandName === "cancel") {

activeCountdown = false;

return interaction.reply({
  content: "Countdown cancelled."
});

}

});

client.login(process.env.TOKEN);
