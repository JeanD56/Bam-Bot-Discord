module.exports = class Command {

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "Pas de description donné.";
        this.category = options.category || "Divers";
        this.usage = options.usage || "Pas d'usage donné";
    }

    async run(message, args){
        throw new Error(`Commande ${this.name} n'a pas de methode de lancement!`);
    }
}