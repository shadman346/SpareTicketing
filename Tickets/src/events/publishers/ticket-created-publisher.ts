import { Publisher, Subjects, TicketCreatedEvent } from '@shad-tix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
