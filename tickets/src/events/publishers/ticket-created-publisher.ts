import { Publisher, Subjects, TicketCreatedEvent } from "@gsktickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
