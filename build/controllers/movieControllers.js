"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addNewMovie = exports.getCommingSoonMovies = exports.getMovieByType = exports.getMovieByIMDBRating = exports.getMovieByYear = exports.searchMovieByTitle = exports.getMovieById = exports.getAllMovies = void 0;
var movies_json_1 = __importDefault(require("../data/movies.json"));
var fs_1 = __importDefault(require("fs"));
var getAllMovies = function (req, res) {
    res.send(movies_json_1.default);
};
exports.getAllMovies = getAllMovies;
var getMovieById = function (req, res) {
    var id = req.params.id;
    var movie = movies_json_1.default.find(function (movie) { return movie.id === Number(id); });
    if (!movie) {
        res.status(404).send('Movie not found!');
    }
    res.status(200).send(movie);
};
exports.getMovieById = getMovieById;
var searchMovieByTitle = function (req, res) {
    var title = req.params.title;
    var moviesByTitle = movies_json_1.default.filter(function (movie) {
        return movie.Title.toLowerCase().includes(title.toLowerCase());
    });
    if (!moviesByTitle) {
        res.status(404).send('Movie not found!');
    }
    res.status(200).send(moviesByTitle);
};
exports.searchMovieByTitle = searchMovieByTitle;
var getMovieByYear = function (req, res) {
    var year = req.params.year;
    var moviesByYear = movies_json_1.default.filter(function (movie) { return movie.Year === year; });
    if (moviesByYear.length > 0) {
        res.status(200).send(moviesByYear);
    }
    else {
        res.status(404).send('Movies not found!');
    }
};
exports.getMovieByYear = getMovieByYear;
var getMovieByIMDBRating = function (req, res) {
    var imdbRating = req.params.imdbRating;
    var moviesByIMDBRating = movies_json_1.default.filter(function (movie) { return movie.imdbRating === parseInt(imdbRating); });
    if (moviesByIMDBRating.length > 0) {
        res.status(200).send(moviesByIMDBRating);
    }
    else {
        res.status(404).send('Movies not found!');
    }
};
exports.getMovieByIMDBRating = getMovieByIMDBRating;
var getMovieByType = function (req, res) {
    var type = req.params.type;
    var moviesByType = movies_json_1.default.filter(function (movie) { return movie.Type === type; });
    if (moviesByType.length > 0) {
        res.status(200).send(moviesByType);
    }
    else {
        res.status(404).send('Movies not found!');
    }
};
exports.getMovieByType = getMovieByType;
var getCommingSoonMovies = function (req, res) {
    var commingSoonMovies = movies_json_1.default.filter(function (movie) { return movie.ComingSoon === true; });
    if (commingSoonMovies.length > 0) {
        res.status(200).send(commingSoonMovies);
    }
    else {
        res.status(404).send('Movies not found!');
    }
};
exports.getCommingSoonMovies = getCommingSoonMovies;
var addNewMovie = function (req, res) {
    var newMovie = req.body;
    if (!newMovie.Title ||
        !newMovie.Year ||
        !newMovie.imdbRating ||
        !newMovie.Type ||
        !newMovie.ComingSoon ||
        !newMovie.Category) {
        res
            .status(400)
            .send('Movie needs a title, year, imdbRating, type, category and comingSoon field!');
    }
    fs_1.default.readFile('./src/data/movies.json', 'utf8', function (err, data) {
        if (err)
            res.status(500).send('Something went wrong!');
        var movies = JSON.parse(data);
        var newMovieId = movies[movies.length - 1].id + 1;
        var newMovieWithId = __assign({ id: newMovieId }, newMovie);
        movies.push(newMovieWithId);
        fs_1.default.writeFile('./src/data/movies.json', JSON.stringify(movies, null, 2), function (err) {
            if (err)
                res.status(500).send('Something went wrong!');
            res.status(201).send('New movie added!');
        });
    });
};
exports.addNewMovie = addNewMovie;
var updateMovie = function (req, res) {
    var id = req.params.id;
    var movie = movies_json_1.default.find(function (movie) { return movie.id === Number(id); });
    if (!movie) {
        res.status(404).send('Movie not found!');
    }
    var updatedMovie = __assign(__assign({}, movie), req.body);
    var index = movies_json_1.default.indexOf(movie);
    movies_json_1.default[index] = updatedMovie;
    fs_1.default.writeFile('./src/data/movies.json', JSON.stringify(movies_json_1.default, null, 2), function (err) {
        if (err)
            res.status(500).send('Something went wrong!');
        res.status(200).send('Movie updated!');
    });
};
exports.updateMovie = updateMovie;
var deleteMovie = function (req, res) {
    var id = req.params.id;
    var movie = movies_json_1.default.find(function (movie) { return movie.id === Number(id); });
    if (!movie) {
        res.status(404).send('Movie not found!');
    }
    var index = movies_json_1.default.indexOf(movie);
    movies_json_1.default.splice(index, 1);
    fs_1.default.writeFile('./src/data/movies.json', JSON.stringify(movies_json_1.default, null, 2), function (err) {
        if (err)
            res.status(500).send('Something went wrong!');
        res.status(200).send('Movie deleted!');
    });
};
exports.deleteMovie = deleteMovie;
