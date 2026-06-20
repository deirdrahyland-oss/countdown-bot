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

let activeCountdown = null;

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "play34") {

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({
        content: "Join a voice channel first.",
        ephemeral: true
      });
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    const player = createAudioPlayer();

    const resource = createAudioResource(
      "./audio/34.mp3"
    );

    connection.subscribe(player);

    player.play(resource);

    return interaction.reply(
      "Playing 34.mp3"
    );
  }

  if (
    interaction.commandName === "countdown" ||
    interaction.commandName === "rally"
  ) {

    const start = interaction.options.getInteger("start");

    let duration = interaction.options.getInteger("duration");

    if (
      interaction.commandName === "rally" &&
      !duration
    ) {
      duration = 15;
    }

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({
        content: "Join a voice channel first.",
        ephemeral: true
      });
    }

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

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

  if (interaction.commandName === "disconnect") {

    const connection =
      getVoiceConnection(interaction.guild.id);

    if (connection) {
      connection.destroy();
    }

    return interaction.reply(
      "Disconnected from voice."
    );
  }

  if (interaction.commandName === "cancel") {

    activeCountdown = null;

    await interaction.reply(
      "Countdown cancelled."
    );
  }

});

client.login(process.env.TOKEN);
