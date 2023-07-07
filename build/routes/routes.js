"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var movieControllers_1 = require("../controllers/movieControllers");
var express_1 = require("express");
var router = (0, express_1.Router)();
// I created routes by RESTful conventions
router.get('/movies', movieControllers_1.getAllMovies);
router.get('/movies/:id', movieControllers_1.getMovieById);
router.get('/movies/search/:title', movieControllers_1.searchMovieByTitle);
router.get('/movies/year/:year', movieControllers_1.getMovieByYear);
router.get('/movies/imdb/:imdbRating', movieControllers_1.getMovieByIMDBRating);
router.get('/movies/type/:type', movieControllers_1.getMovieByType);
router.get('/movies/comming-soon', movieControllers_1.getCommingSoonMovies);
router.post('/movies/add-movie', movieControllers_1.addNewMovie);
router.put('/movies/update-movie/:id', movieControllers_1.updateMovie);
router.delete('/movies/delete-movie/:id', movieControllers_1.deleteMovie);
exports.default = router;
