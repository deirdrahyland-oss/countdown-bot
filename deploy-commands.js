require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [

  new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Start a countdown")
    .addIntegerOption(option =>
      option
        .setName("start")
        .setDescription("Starting number")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(50)
    )
    .addIntegerOption(option =>
      option
        .setName("duration")
        .setDescription("How many numbers to count")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(50)
    ),

  new SlashCommandBuilder()
    .setName("rally")
    .setDescription("15 second rally countdown")
    .addIntegerOption(option =>
      option
        .setName("start")
        .setDescription("Starting number")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(50)
    )
    .addIntegerOption(option =>
      option
        .setName("duration")
        .setDescription("Optional duration (default 15)")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(50)
    ),

  new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from voice"),

  new SlashCommandBuilder()
    .setName("play34")
    .setDescription("Play 34 audio test"),

  new SlashCommandBuilder()
    .setName("cancel")
    .setDescription("Cancel active countdown")

].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();
