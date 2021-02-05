const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

const validUser = {
  username: "Anna",
  password: "nattoyumyum",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const newUser = {
    username: "Anna",
    name: "Anna",
    password: "nattoyumyum",
  };
  await api.post("/api/users").send(newUser);
});

test("Login returns a valid token", async () => {
  const response = await api.post("/api/login").send(validUser).expect(200);

  expect(response.body.username).toEqual(validUser.username);
});

test("Login fails with wrong password", async () => {
  const wrongPassword = {
    username: "Anna",
    password: "nattoewwwyucky",
  };
  const response = await api.post("/api/login").send(wrongPassword).expect(401);
  expect(response.body.error).toContain("Password or username incorrect");
});

test("Login fails with wrong username", async () => {
  const wrongUserName = {
    username: "Some random ass person",
    password: "nattoyumyum",
  };

  const response = await api.post("/api/login").send(wrongUserName).expect(401);
  expect(response.body.error).toContain("Password or username incorrect");
});

test("Can post with a valid token", async () => {
  const response = await api.post("/api/login").send(validUser);
  const token = response.body.token;

  const blog = {
    title: "Give me fish I want fish meow meow",
    author: "Satsuki the Cat",
    url: "http://meow.com/meow/blog",
    likes: 2,
  };

  const response2 = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blog)
    .expect(201);

  expect(response2.body.title).toEqual(blog.title);
});

test("Can't post with an invalid token", async () => {
  const badtoken = "this is a crap token lalalala";

  const blog = {
    title: "Give me fish I want fish meow meow",
    author: "Satsuki the Cat",
    url: "http://meow.com/meow/blog",
    likes: 2,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${badtoken}`)
    .send(blog)
    .expect(401);

  expect(response.body.error).toContain("invalid token");
});

afterAll(() => {
  mongoose.connection.close();
});
