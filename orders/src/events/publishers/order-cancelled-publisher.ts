import { Publisher, OrderCancelledEvent, Subjects } from "@gsktickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
