const { Client, Collection} = require("discord.js");

const fs = require("fs");
const path = require('path');

module.exports = class client extends Client {
    constructor (options = {}) {
        super(options);
        
        this.commands = new Collection();
        this.commandAliases = new Collection();

        this.events = new Collection();

        this.console = require('./utils/Console');

        this.baseFolder = path.dirname(require.main.filename);
        this._commandsFolder = path.join(this.baseFolder, '/commands/');
        this._eventsFolder = path.join(this.baseFolder, '/events/');
    }

    async loadCommandFolder() {
        const folderExists = await fs.existsSync(this._commandsFolder);
        if(!folderExists) await fs.mkdirSync(this._commandsFolder);
        const commands = await fs.readdirSync(this._commandsFolder);
        this.console.log(`${commands.length} tane komut yükleniyor...`)
        commands.forEach(command => {
            this.console.log
            const currentCommand = require(`${this._commandsFolder}/${command}`);
            this.addCommand(currentCommand, new currentCommand(this));
        });
    }

    addCommand(command, commandName) {
        const name = command.name ? command.name : commandName; 
        this.commands.set(name, command);

        if (command.aliases.lenght === 0) return command;
        command.alieases.forEach(a => this.commandAliases.set(a, command));
        return command;
    }

    reloadCommand(commandName) {
        let command;
        if (this.commands.has(commandName)) command = this.commands.get(commandName);
        else if (this.commandAliases.has(commandName)) return this.console.error(`Komut eşleri burada kullanılamaz`)

        if (!command) this.console.error(`${commandName} herhangi bir komut değil`);

        delete require.cache[require.resolve(`${this._commandsFolder}/${commandName}.js`)];

        require(`${this._commandsFolder}/${commandName}`);
        this.addCommand(command, commandName);
    }

    async loadEvents() {
        const folderExists = await fs.existsSync(this._eventsFolder);
        if(!folderExists) await fs.mkdirSync(this._eventsFolder);
        const eventFiles = await fs.readdirSync(this._eventsFolder);
        this.console.log(`${eventFiles.length} tane komut yükleniyor.`);
        eventFiles.forEach(e => {
            const eventName = e.split(".")[0];
            const event = require(`${this._eventsFolder}/${e}`);
            super.on(eventName, event.run.bind(null, client));

            await this.addEvent(event, new event(this));
            return e;
        })

    }

    async login(token) {
        await this.init();
        super.login(token);
    }

};
