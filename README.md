[![Discord](https://discordapp.com/api/guilds/405324771069394964/embed.png)](https://discord.gg/nb4eYFR)
# discord-bot-boilerplate
Hızlı ve kolay bir şekilde bot yazabilmeniz için minik bir command handler. 

# İndirme ve kullanım
```
git clone https://github.com/KozalakliKozalak/discord-bot-boilerplate.git
```
ile indirdikten sonra 
```
npm i
``` 
ile modülleri indirin.

Daha sonra ise config.json dosyasını kendinize göre düzenleyin.

## Event oluşturma
Bir event oluşturmak için tek yapmanız gereken tek şey events klasörüne yeni bir dosya ekleyip aşağıdaki örnek üzerinden devam etmek.

```js
    module.exports = class Message {
    constructor (client) {
        this.name = 'message'; // Burayı sadece dosya ismi event ismi ile aynı olmayacak ise ekleyin. Eğer dosya ismi aynı ise sadece boş constructor oluşturun.
    }
    //Aşağıdaki methodda this, client'ı işaret ediyor. Eğer class içerisinde başka bir methoda erişmeniz gerekirse class'a verdiğiniz isim ile erişebilirsiniz.
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
```

## Komut oluşturma
Aynı bu örnek 
```js
   module.exports = class Ping {
    constructor(client) {
        this.client = client; // Class içerisinde her yerden client'a erişmek için
        this.name = 'ping'; // İsim vermezseniz komut dosya ismiyle çalışacak
        this.aliases = ['p']; // Buraya istediğiniz kadar alias ekleyebilirsiniz. Alias'ın ne demek olduğuna gelecek olursak basit bir şekilde takma ad. Örneğin bu komut <prefix>ping yada <prefix>p ile çalışacak
    }

    // Event'deki run methodunun aksine burada this komut dosyasını işaret ediyor. Yani başka bir method ekleyecek olursanız this.methodİsmi şeklinde erişebilirsiniz.
    async run(msg, ...args) {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! Gecikme sadece ${m.createdTimestamp - msg.createdTimestamp}ms. API gecikmesi ise ${Math.round(this.client.ping)}ms.`)
    }
}
```

# Ek notlar

Eğer herhangi bir değişiklik yapabileceğinizi düşünüyorsanız bu repository'e fork açıp pull request atabilirsiniz.


Bu command handler basitlik üzerine düşünülerek yapılmıştır, daha fazla bilgi ve soru cevap için discord [sunucumuza](https://discord.gg/nb4eYFR) katılabilirsiniz.

Made with love and cup of coffee.






