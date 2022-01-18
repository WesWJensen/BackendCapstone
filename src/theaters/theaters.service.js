const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex("theaters").select("*");
}

function getMovies(theater) {
    return knex("theaters")
        .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where("theaters.theater_id", "=", theater.theater_id);
}

function listMovieById(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.movie_id")
        .where("m.movie_id", "=", movie_id);
}

module.exports = {
    list,
    listMovieById,
    getMovies
};