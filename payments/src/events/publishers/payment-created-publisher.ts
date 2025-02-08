import { Subjects, Publisher, PaymentCreatedEvent } from "@gsktickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
