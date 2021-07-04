const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const cors = require('cors');
const jsonData = require('./pokedoc.json');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get("/pokemon", (req, res) => {
    console.log("route /pokemon accessed.");
    const pokemonDataJson = jsonData;

    if (pokemonDataJson) {
        res.status(200).send(pokemonDataJson);
    } else {
        res.status(404).send("Couldn't get all pokemon data!");
        console.log("Couldn't get all pokemon data");
    }
});

app.get("/pokemon/:id", (req, res) => {
    const allPokemonDataJson = jsonData;
    const onePokemonById = allPokemonDataJson.find(pokemon => pokemon.id === Number(req.params.id));
    if (onePokemonById) {
        res.status(200).send(onePokemonById);
    } else {
        res.status(404).send("Couldn't get the pokemon data.");
    }
});

app.get("/pokefight", (req, res) => {
    res.send("Hello Pokemon");
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});

module.exports = app;
