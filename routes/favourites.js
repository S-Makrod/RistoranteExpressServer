const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Favourites = require("../models/favourites");

const favouritesRouter = express.Router();

favouritesRouter.use(bodyParser.json());

favouritesRouter.route("/")
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .populate("user")
    .populate("dishes")
    .then((favourites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favourites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourites) => {
        if(favourites === null) {
            Favourites.create({user: req.user._id})
            .then((favourites) => {
                for(let i = (req.body.length - 1); i >= 0; i--){
                    favourites.dishes.push(req.body[i]);
                }

                favourites.save().then((favourites) => {
                    console.log("Favourite Created ", favourites);
                    Favourites.findById(favourites._id)
                    .populate("user")
                    .populate("dishes")
                    .then((favourites) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(favourites);
                    }, (err) => next(err));
                }, (err) => next(err));
            }, (err) => next(err));
        } else {
            for(let i = (req.body.length - 1); i >= 0; i--){
                favourites.dishes.push(req.body[i]);
            }

            favourites.save().then((favourites) => {
                Favourites.findOne(favourites._id)
                .populate("user")
                .populate("dishes")
                .then((favourites) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favourites);
                }, (err) => next(err));
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on favourites");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.remove({user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

favouritesRouter.route("/:dishId")
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on favourites/" + req.params.dishId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourites) => {
        if(favourites === null) {
            Favourites.create({user: req.user._id})
            .then((favourites) => {
                favourites.dishes.push(req.params.dishId)
                favourites.save().then((favourites) => {
                    console.log("Favourite Created ", favourites);
                    Favourites.findOne(favourites._id)
                    .populate("user")
                    .populate("dishes")
                    .then((favourites) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(favourites);
                    }, (err) => next(err));
                }, (err) => next(err));
            }, (err) => next(err));
        } else {
            if(favourites.dishes.indexOf(req.params.dishId) === -1){
                favourites.dishes.push(req.params.dishId);
                favourites.save().then((favourites) => {
                    Favourites.findOne(favourites._id)
                    .populate("user")
                    .populate("dishes")
                    .then((favourites) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(favourites);
                    }, (err) => next(err));
                }, (err) => next(err));
            } else {
                err = new Error("Dish " + req.params.dishId + " already in the favourites list");
                err.status = 403;
                return next(err);
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on favourites/" + req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourites) => {
        if(favourites.dishes.indexOf(req.params.dishId) !== -1) {
            favourites.dishes.remove(req.params.dishId);

            favourites.save().then((favourites) => {
                Favourites.findOne(favourites._id)
                .populate("user")
                .populate("dishes")
                .then((favourites) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favourites);
                })
            }, (err) => next(err));
        } else {
            err = new Error("Dish " + req.params.dishId + " not found in the favourites list");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favouritesRouter;