require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const { PORT, DB_TEST_HOST } = process.env;

describe("test login function", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "test@gmail.com",
      password: "vzdrRV_F576",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test@gmail.com",
      password: "vzdrRV_F576",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
