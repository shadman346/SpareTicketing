import { Subjects, Publisher, OrderCancelledEvent } from '@shad-tix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
