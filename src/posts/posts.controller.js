const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.json({ data: data[0] });
}

async function update(req, res) {
  const updatedPost = {
    ...req.body.data,
    post_id: res.locals.post.post_id,
  }
  const data = await service.update(updatedPost);
  res.json({ data: data[0] });
}

async function destroy(req, res) {
  await service.delete(res.locals.post.post_id);
  res.sendStatus(204);
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
