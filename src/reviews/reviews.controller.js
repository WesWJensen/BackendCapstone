const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
    const { movieId } = req.params;
  const queryResult = await service.list(movieId);
  res.json({ data: queryResult });
}

async function update(req, res, next) {
  
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const reviewUpdateData = await service.update(updatedReview);
  const data = {
    "review_id": reviewUpdateData.review_id, 
    "content": reviewUpdateData.content,
    "score": reviewUpdateData.score,
    "critic_id": reviewUpdateData.critic_id,
    "movie_id": reviewUpdateData.movie_id,
    "created_at": reviewUpdateData.critic.created_at,
    "updated_at": reviewUpdateData.critic.updated_at,
    "critic": {
      "preferred_name": reviewUpdateData.critic.preferred_name,
      "surname": reviewUpdateData.critic.surname,
      "organization_name": reviewUpdateData.critic.organization_name,
    }
  };
  res.json({ data: data });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};