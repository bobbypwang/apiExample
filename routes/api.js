const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../models/monster');


/* GET home page */
router.get('/', (req, res, next) => {
    axios.get('http://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')
        .then(allPokes => {
            res.render('apiViews/apiHome', { allThePokemon: allPokes.data.results });
        })
        .catch(err => next(err))
});

router.get('/poke/:pokeId', (req, res, next) => {
    Pokemon.findOne({ pokeId: Number(req.params.pokeId) + 1 })
        .then(pokeFromDb => {
            if (pokeFromDb) {
                res.render('apiViews/apiDetails', {
                    pokes: pokeFromDb,
                    isSaur: pokeFromDb.name.includes('saur')
                })
            } else {
                axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(req.params.pokeId) + 1}`)
                    .then(responseFromAPI => {
                        Pokemon.create({
                                pokeId: responseFromAPI.data.id,
                                name: responseFromAPI.data.name,
                                front_default: responseFromAPI.data.sprites.front_default,
                                back_default: responseFromAPI.data.sprites.back_default,
                                front_shiny: responseFromAPI.data.sprites.front_shiny,
                                back_shiny: responseFromAPI.data.sprites.back_shiny,
                            })
                            .then(newPokeinDb => {
                                res.render('apiViews/apiDetails', {
                                    pokes: newPokeinDb,
                                    isSaur: newPokeinDb.name.includes('saur')
                                })
                            }).catch(err => next(err))
                    }).catch(err => next(err))
            }
        }).catch(err => next(err))
});

module.exports = router;