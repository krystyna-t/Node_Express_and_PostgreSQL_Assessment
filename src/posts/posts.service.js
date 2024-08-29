const knex = require("../db/connection");

function create(post) {
  return knex("posts")
    .insert(post)
    .returning(["post_body", "post_id", "post_title"]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  return knex("posts")
    .select("*")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, "*")
    .returning(["post_body", "post_id", "post_title"]);
}

function destroy(postId) {
  return knex("posts").where({ post_id: postId }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
