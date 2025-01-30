import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@gsktickets/common";
import mongoose from "mongoose";

const router = express.Router();
// We are adding a validation to check if the ticketId is a type of MongoDB ObjectId
// We are introducing a coupling between the ticket and order service that ticket ids will be of type Mongo ObjectId
// Ticket service can have Ids of any type (it can use any db)
router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
