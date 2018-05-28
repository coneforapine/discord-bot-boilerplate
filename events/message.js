module.exports = class Message {
    constructor (client) {
        this.name = 'message';
    }
    //remember on this method this === client not the current class 
    async run(msg) {
        if(msg.author.bot) return;

        const prefix = this.config.prefix;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.commands.get(command) || this.commandAliases.get(command); 
        if(!cmd) return;

        await cmd.run(msg, args);
    }
};