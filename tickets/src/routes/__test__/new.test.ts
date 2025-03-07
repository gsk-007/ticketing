import request from "supertest";
import app from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

const URL = "/api/tickets";
it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post(URL).send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signing in", async () => {
  await request(app).post(URL).send({}).expect(401);
});

it("returns a status other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "New Title",
    })
    .expect(400);

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send({
      title: "New Title",
      price: -10,
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const newTicket = {
    title: "New Title",
    price: 20,
  };

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send(newTicket)
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(newTicket.title);
  expect(tickets[0].price).toEqual(newTicket.price);
});

it("publishes an event", async () => {
  const newTicket = {
    title: "New Title",
    price: 20,
  };

  await request(app)
    .post(URL)
    .set("Cookie", global.signin())
    .send(newTicket)
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
