const knex = require("../db/connection");

async function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(criticAssign)));
}

async function read(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId }).first();
}


async function readCritics(critic_id) {
  return knex("critics")
    .where({ critic_id }).first();
}

async function criticAssign(review) {
  review.critic = await readCritics(review.critic_id);
  return review;
}


async function update(review) {
    return knex("reviews")
      .select("*")
      .where({ review_id: review.review_id })
      .update(review, "*")
      .then(() => read(review.review_id))
      .then(criticAssign);
  }

module.exports = {
  delete: destroy,
  list,
  read,
  update,
};