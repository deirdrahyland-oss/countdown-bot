require("dotenv").config();

const {
Client,
GatewayIntentBits,
Events
} = require("discord.js");

const {
joinVoiceChannel,
getVoiceConnection,
createAudioPlayer,
createAudioResource
} = require("@discordjs/voice");

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

```
console.log("play34 started");

const voiceChannel = interaction.member.voice.channel;

if (!voiceChannel) {
  console.log("No voice channel");
  return interaction.reply({
    content: "Join a voice channel first.",
    ephemeral: true
  });
}

console.log("Joining voice");

const connection = joinVoiceChannel({
  channelId: voiceChannel.id,
  guildId: voiceChannel.guild.id,
  adapterCreator: voiceChannel.guild.voiceAdapterCreator
});

console.log("Voice joined");

const player = createAudioPlayer();

console.log("Creating resource");

const resource = createAudioResource("./audio/34.mp3");

console.log("Subscribing player");

connection.subscribe(player);

console.log("Playing audio");

player.play(resource);

return interaction.reply("Playing 34.mp3");
```

}

if (interaction.commandName === "disconnect") {

```
const connection =
  getVoiceConnection(interaction.guild.id);

if (connection) {
  connection.destroy();
}

return interaction.reply(
  "Disconnected from voice."
);
```

}

});

client.login(process.env.TOKEN);
