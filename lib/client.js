const { Client, Collection} = require("discord.js");
const Console = require('./utils/Console');
const fs = require("fs");
const path = require('path');


module.exports = class client extends Client {
    constructor (options = {}) {
        super(options);
        
        this.commands = new Collection();
        this.commandAliases = new Collection();

        this.events = new Collection();

        this.logger = new Console();

        this.config = require('../conf.json');

        this.baseFolder = path.dirname(require.main.filename);
        this._commandsFolder = path.join(this.baseFolder, '/commands/');
        this._eventsFolder = path.join(this.baseFolder, '/events/');
    }

    async loadCommands() {
        const folderExists = await fs.existsSync(this._commandsFolder);
        if(!folderExists) await fs.mkdirSync(this._commandsFolder);
        const commands = await fs.readdirSync(this._commandsFolder);
        if(commands.length === 0) return this.logger.warn(`Commands klasörü boş, atlanıyor...`);
        this.logger.log(`${commands.length} tane komut yükleniyor...`)
        
        commands.forEach(command => {
            const commandName = command.split(".")[0]
            this.logger.log
            const currentCommand = require(`${this._commandsFolder}/${command}`);
            this.addCommand(new currentCommand(this), commandName);
        });
    }

    addCommand(command, commandName) {
        const name = command.name ? command.name : commandName; 
        this.commands.set(name, command);

        if (!command.aliases && command.aliases.lenght === 0) return command;
        command.aliases.forEach(a => this.commandAliases.set(a, commandName)); // Senpai, don't leak my memory
        return command;
    }

    reloadCommand(commandName) {
        let command;
        if (this.commands.has(commandName)) command = this.commands.get(commandName);
        else if (this.commandAliases.has(commandName)) return this.logger.error(`Komut eşleri burada kullanılamaz`)

        if (!command) this.logger.error(`${commandName} herhangi bir komut değil`);

        delete require.cache[require.resolve(`${this._commandsFolder}/${commandName}.js`)];

        require(`${this._commandsFolder}/${commandName}`);
        this.addCommand(new command(this), commandName);
    }

    async loadEvents() {
        const folderExists = await fs.existsSync(this._eventsFolder);
        if(!folderExists) await fs.mkdirSync(this._eventsFolder);
        const eventFiles = await fs.readdirSync(this._eventsFolder);
        if(eventFiles.length === 0) return this.logger.warn(`Events klasörü boş, atlanıyor...`);
        this.logger.log(`${eventFiles.length} tane event yükleniyor...`);
        eventFiles.forEach(e => {
            const event = require(`${this._eventsFolder}/${e}`);
            const newEvent = new event(this);
            const eventName = newEvent.name ? newEvent.name : e.split(".")[0];
            this.addEvent(newEvent, eventName);
            super.on(eventName, newEvent.run.bind(newEvent)); //this line is beatiful I think?

            delete require.cache[require.resolve(`${this._eventsFolder}/${e}`)]

            return e;
        });
    }

    addEvent(event, eventName) {
        this.events.set(event, eventName);
    }

    async init() {
        await this.loadCommands();
        await this.loadEvents();
        this.logger.ready('Her şey hazır. Ready eventi çalıştırılıyor...');
    }

    async login(token) {
        await this.init();
        super.login(token);
    }
    
};
