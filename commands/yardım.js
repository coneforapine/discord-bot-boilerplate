module.exports = class Yardım {
    constructor(client) {
        this.client = client;
        this.name = 'yardım';
        this.aliases = ['help'];
        this.help = 'Bu sayfayı görüntülersiniz veya bir komut hakkında bilgi alırsınız... Yani, sanırım.'
        this.usage = '(Komut İsmi)';
        this.prefix = this.client.config.prefix;
    }

    async run(msg, args) {
        if (!args[0]) {
            const commandNames = this.client.commands.keyArray();
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            const output = `= Komut Listesi =\n\n[Komut hakkında bilgi almak için ${this.prefix}yardım <komut ismi>]\n${this.client.commands.map(c => `${this.prefix}${c.name}${' '.repeat(longest - c.name.length)} :: ${c.help}`).join('\n')}`
            msg.channel.send(output, {
                code: 'asciidoc',
                split: {
                    char: "\n"
                }
            })
        } else {
            if (args[0]) {
                let komut = args[0];
                if (this.client.commands.has(komut)) {
                    const command = this.client.commands.get(komut);
                    if (command.usage === undefined) {
                    msg.channel.send(`= ${command.name} = \n${command.help}\ntakma adları:: ${command.aliases.join(", ")}`, {
                        code: 'asciidoc'
                    })
                    } else {
                    msg.channel.send(`= ${command.name} = \n${command.help}\nkullanım:: ${this.prefix}${command.name} ${command.usage}\ntakma adları:: ${command.aliases.join(", ")}`, {
                        code: 'asciidoc'
                    })
                    }
                }
            }
        }
    }
}
