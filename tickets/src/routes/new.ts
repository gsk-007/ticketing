import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@gsktickets/common";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater that 0."),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(200).send("Create a ticket");
  }
);

export { router as createTicketRouter };
