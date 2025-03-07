import request from "supertest";
import app from "../../app";

const createTicket = (title: string = "New Ticket", price: number = 20) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket("New Ticket 2");
  await createTicket("New Ticket 3", 25);

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
