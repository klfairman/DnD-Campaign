// API routes to go here

var db = require("../models");

module.exports = function (app) {
    // Returns a Game object
    app.get("/api/game/:id", function (req, res) {
        var id = req.params.id.split();
        // Add a join to include all of each Author's Posts
        db.Game.findAll({
            include: [
                db.Player
            ],
            where: {
                id: id[0]
            }
        }).then(function (response) {
            res.json(response);
        });
    });

    // Returns a Game object based on a save code
    app.get("/api/loadgame/:code", function (req, res) {
        console.log("tried to load game")
        var code = req.params.code;
        console.log(code)
        // 1. Add a join to include all of each Author's Posts
        db.Game.findAll({
            include: [
                db.Player
            ],
            where: {
                code: code
            }
        }).then(function (response) {
            res.json(response);
        });
    });

    // Creates a new player
    app.post("/api/player/", function (req, res) {

        db.Player.create({
            name: req.body.name,
            gender: req.body.gender,
            race: req.body.race,
            class: req.body.class,
            hp: req.body.hp,
            atk: req.body.atk,
            spriteURL: req.body.spriteURL,
            spriteURL_battle: req.body.spriteURL_battle,
            charPortrait: req.body.charPortrait,
            GameId: req.body.GameId
        }).then(function(newPlayer) {
            res.json(newPlayer);
        });
    });

    // Creates a new game
    app.post("/api/game/", function (req, res) {
        // generate random four-char alphanumeric code
        var codeChars = ['a', '3', '4', '5', '9', 'e', '1', 'w', 'x', 'y', '7'];
        var char1 = codeChars[Math.floor(Math.random()*11)];
        var char2 = codeChars[Math.floor(Math.random()*11)];
        var char3 = codeChars[Math.floor(Math.random()*11)];
        var char4 = codeChars[Math.floor(Math.random()*11)];
        var generatedCode = char1+char2+char3+char4;

        db.Game.create({
            code: generatedCode
        }).then(function(newGame) {
            res.json(newGame)
        });
    });

    // Updates a player based on the id in the req body
    app.put("/api/player/", function (req, res) {
        db.Player.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function(updatedPlayer) {
                res.json(updatedPlayer);

            });
    });

    // Updates a game based on the id in the req body.
    app.put("/api/game/", function (req, res) {
        console.log("Updating game with id " + req.body.id);
        console.log("New currentLocI: " + req.body.currentLocI); 

        db.Game.update(
            {currentLocI: req.body.currentLocI},
            {
                where: {
                    id: req.body.id
                }
            }).then(function(updatedGame) {
                res.json(updatedGame);
            });
    });
}