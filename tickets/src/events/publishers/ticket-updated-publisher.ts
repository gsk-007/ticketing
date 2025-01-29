import { Publisher, Subjects, TicketUpdatedEvent } from "@gsktickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
