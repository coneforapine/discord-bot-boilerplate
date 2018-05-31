module.exports = class Reload {

    constructor(client) {
        this.client = client;
        this.name = 'reload';
        
        this.ownerID = this.client.config.ownerID;
        this.aliases = ['r'];

        this.help = 'Komutları yeniden yüklemeyi sağlar';
    }

    async run (msg, args) {
        if( this.ownerID !== msg.author.id) return msg.channel.send('Bu komutu kullanabilmek için botun sahibi olmanız gerekiyor.')
        let command;
        if (this.client.commands.has(args[0])) command = this.client.commands.get(args[0]);
        // Not: Komutların yapısını fazla düzenlemek istemiyorum. Ne yapacağınızı biliyorsanız burayı değiştirmekle serbestiniz. /shrug
        if (this.client.commandAliases.has(args[0])) return msg.channel.send("Komutlar takma isimleri ile yeniden yüklenemez."); 
        
        if (!command) return msg.channel.send(`${args[0]} herhangi bir komut değil`);
        
        await this.client.reloadCommand(command.name);
        msg.channel.send(`Komut yeniden yüklendi: ${args[0]}`);
    }

};