module.exports = class Command {
    constructor(client) {
        this.client = client;

        this.name = '';
        this.aliases = [];

        this.cooldown = {
            enabled: true,
            time: 30000
        };

        this.cooldowns = new Map();
    }

    cooldownUser(user, time) {
        if(!this.cooldowns.has(user.id)) {
            this.cooldowns.set(user.id, Date.now());
            setTimeout(() => {
                this.cooldowns.delete(user.id);
            }, this.cooldown.time)
        }
    }
}