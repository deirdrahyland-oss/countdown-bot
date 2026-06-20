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
    .setName("cancel")
    .setDescription("Cancel active countdown")

].map(command => command.toJSON());
