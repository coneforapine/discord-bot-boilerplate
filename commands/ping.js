module.exports = class Ping {
    constructor(client) {
        this.client = client;
        this.name = 'ping';
        this.aliases = ['p'];
        this.help = 'Ping ve pong, ama Ping-Pong değil. Mükemmel değil mi?'
    }

    async run(msg, ...args) {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! Gecikme sadece ${m.createdTimestamp - msg.createdTimestamp}ms. API gecikmesi ise ${Math.round(this.client.ping)}ms.`)
    }
}