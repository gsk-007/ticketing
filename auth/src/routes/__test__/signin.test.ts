import request from "supertest";
import app from "../../app";

const URL = "/api/users/signin";

it("fails when an email that does not exist is supplied", async () => {
  await request(app)
    .post(URL)
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("fails when an incorrect pasword is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post(URL)
    .send({ email: "test@test.com", password: "sdfsfsd" })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post(URL)
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
