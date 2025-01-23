import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

const URL = "/api/tickets/";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(URL + id)
    .set("Cookie", global.signin())
    .send({
      title: "New Title",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(URL + id)
    .send({
      title: "New Title",
      price: 20,
    })
    .expect(401);
});
it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app).post(URL).set('Cookie', global.signin()).send({title: 'New Title', price:20})

  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({
    title:'sdfsd',
    price: 100
  }).expect(401)
});

it("returns a 400 if the user provides and invalid title or price", async () => {
  const cookie = global.signin()
  const response = await request(app).post(URL).set('Cookie', cookie).send({title: 'New Title', price:20})

  await request(app).put(URL+response.body.id).set('Cookie',cookie).send({title: '', price:20}).expect(400)
  await request(app).put(URL+response.body.id).set('Cookie',cookie).send({title: 'New Title 2', price:-10}).expect(400)
});

it("updates the ticket provided valid inputs", async() => {
  const cookie = global.signin()
  const response = await request(app).post(URL).set('Cookie', cookie).send({title: 'New Title', price:20})

  await request(app).put(URL+response.body.id).set('Cookie',cookie).send({title: 'new title', price:200}).expect(200)

  const ticketResponse = await request(app).get(URL+response.body.id).send()

  expect(ticketResponse.body.title).toEqual('new title')
  expect(ticketResponse.body.price).toEqual(200)

});
