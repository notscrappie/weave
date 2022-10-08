const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const musicChecker = require("../../functions/musicChecker.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue."),

  async execute(interaction, client) {
    
    if (await musicChecker.vc(interaction)) return;

    const player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channelId,
        selfDeafen: true,
        volume: 50
    });
    
    if (await musicChecker.playing(interaction, player)) return;

    player.queue.shuffle();

    const shuffleEmbed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription("🔹 |  Shuffled the queue.")
      .setTimestamp();
    return interaction.reply({
      embeds: [shuffleEmbed],
    });
  },
};
