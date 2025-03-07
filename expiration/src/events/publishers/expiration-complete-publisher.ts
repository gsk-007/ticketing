import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@gsktickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
