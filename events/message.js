module.exports = class Message {
    constructor (client) {
        this.client = client;
        this.name = 'message';
    }
    
    async run(msg) {
        if(msg.author.bot) return;
        const prefix = this.client.config.prefix;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.commandAliases.get(command)); // Feels good. 

        if(!cmd) return;

        await cmd.run(msg, args);
    }
};