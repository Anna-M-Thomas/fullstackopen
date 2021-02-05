const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const newUser = new User({
    username: "Anna",
    name: "Anna",
    password: "nattoyumyum",
  });
  await newUser.save();
});

test("Successfully gets correct number of users", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(1);
});

test("Responds to a not unique username with 400 status", async () => {
  const sameUser = {
    username: "Anna",
    name: "George",
    password: "nattoyuck",
  };

  const result = await api
    .post("/api/users")
    .send(sameUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("`username` to be unique");
});

test("Responds to a too-short password with a 400 error and a complaint", async () => {
  const tooShort = {
    username: "Kimberly",
    name: "Kimberly",
    password: "nat",
  };

  const result = await api
    .post("/api/users")
    .send(tooShort)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
