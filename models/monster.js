const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const pokemonSchema = new Schema({
    pokeId: String,
    name: String,
    front_default: String,
    back_default: String,
    front_shiny: String,
    back_shiny: String,
}, {
    timestamps: true
});

const PokeModel = mongoose.model("Poke", pokemonSchema);
module.exports = PokeModel;