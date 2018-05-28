module.exports = class Ready {
    constructor (client) {
        this.client = client; 
        this.name = 'ready'
    }
    
  
    async run() {
        this.client.logger.ready(`Her şey hazır. ${this.client.guilds.size} sunucuda, ${this.client.users.size} kişiye hizmet veriliyor.`);
    }
};