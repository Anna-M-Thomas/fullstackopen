const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Comment = require("../models/comment");

const api = supertest(app);

beforeEach(async () => {
  await Comment.deleteMany({});
  const newComment = new Comment({
    content: "This blog suuuucks",
    blog: "60221bb5d58be60953cbbd1b",
  });
  await newComment.save();

  const newComment2 = new Comment({
    content: "WELLL actually!",
    blog: "60221bb5d58be60953cbbd1b",
  });
  await newComment2.save();
});

test("Successfully gets comments", async () => {
  const response = await api
    .get("/api/blogs/60221bb5d58be60953cbbd1b/comments")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const contains = response.body.map((item) => item.content);

  expect(contains).toContain("This blog suuuucks");
  expect(contains).toContain("WELLL actually!");
});

test("Successfully posts comment", async () => {
  const newComment = { content: "I'm a third comment" };

  const response = await api
    .post("/api/blogs/60221bb5d58be60953cbbd1b/comments")
    .send(newComment)
    .expect(201);
  expect(response.body.content).toEqual(newComment.content);
  expect(response.body.blog).toEqual("60221bb5d58be60953cbbd1b");
});

afterAll(() => {
  mongoose.connection.close();
});
