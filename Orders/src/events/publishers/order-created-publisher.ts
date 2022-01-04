import { Publisher, OrderCreatedEvent, Subjects } from '@shad-tix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
