const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper.js");
const Blog = require("../models/blog");
const User = require("../models/user");

const { expressionStatement } = require("@babel/types");

const api = supertest(app);

let token;

beforeEach(async () => {
  jest.setTimeout(10000);
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogObjects = testHelper.blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promises);

  const newUser = {
    username: "Anna",
    name: "Anna",
    password: "nattoyumyum",
  };

  const validUser = {
    username: "Anna",
    password: "nattoyumyum",
  };

  await api.post("/api/users").send(newUser);
  const tokenresponse = await api.post("/api/login").send(validUser);
  token = tokenresponse.body.token;
});

//4.8
test("Successfully gets correct number of blogs", async () => {
  const response = await api.get("/api/blogs").expect(200);

  expect(response.body).toHaveLength(testHelper.blogs.length);
});

//4.9*
test("id for each blog is id, not _id", async () => {
  const response = await api.get("/api/blogs");
  const first = response.body[0];

  expect(first.id).toBeDefined();
});

//4.10
test("Posting a new blog is successful", async () => {
  const newBlog = {
    title: "Argentina on Two Steaks a Day",
    author: "Maciej Cegłowski",
    url: "https://idlewords.com/2006/04/argentina_on_two_steaks_a_day.htm",
    likes: 4,
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201);
  expect(response.body.title).toEqual(newBlog.title);

  const all = await api.get("/api/blogs");
  expect(all.body).toHaveLength(testHelper.blogs.length + 1);
  const titles = all.body.map((blog) => blog.title);
  expect(titles).toContain("Argentina on Two Steaks a Day");
});

//4.11*
test("Likes defaults to 0 if not provided", async () => {
  const newBlog = {
    title: "Give Me a Tuna Sandwich",
    author: "Satsuki the Cat",
    url: "https://meow.com/blog/tuna_plz",
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201);
  expect(response.body.likes).toEqual(0);
});

//4.12*
test("Responds to posts without title and/or URL with 400 bad request", async () => {
  const noTitleOrAuthor = {
    url: "https://meow.com/blog/tuna_plz",
  };

  const noAuthor = {
    title: "Give Me a Tuna Sandwich",
    url: "https://meow.com/blog/tuna_plz",
  };

  const noTitle = {
    author: "Satsuki the Cat",
    url: "https://meow.com/blog/tuna_plz",
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(noTitleOrAuthor)
    .expect(400);
  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(noAuthor)
    .expect(400);
  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(noTitle)
    .expect(400);
});

//This was optional "Feel free to implement tests for the functionality if you want to."
test("Successfully deletes a blog with correct id", async () => {
  const newBlog = {
    title: "Argentina on Two Steaks a Day",
    author: "Maciej Cegłowski",
    url: "https://idlewords.com/2006/04/argentina_on_two_steaks_a_day.htm",
    likes: 4,
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog);

  const id = response.body.id;
  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", `bearer ${token}`)
    .expect(204);
  const response2 = await api.get("/api/blogs");
  //You added 1 and then deleted it
  expect(response2.body).toHaveLength(testHelper.blogs.length);
});

//This was optional "Feel free to implement tests for the functionality if you want to."s
test("Successfully updates a blog's likes", async () => {
  const id = testHelper.blogs[0]._id;
  const updatedLikes = { likes: 5 };
  const response = await api.put(`/api/blogs/${id}`).send(updatedLikes);
  expect(response.body.likes).toEqual(5);
  expect(response.body.id).toEqual(id);
});

//4.22*
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

// npm test -- -t "Successfully updates a blog's likes"
