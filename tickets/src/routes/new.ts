import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/tickets", (req: Request, res: Response) => {
  res.status(200).send("Create a ticket");
});

export { router as createTicketRouter };
