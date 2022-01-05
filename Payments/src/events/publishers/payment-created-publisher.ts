import { Subjects, Publisher, PaymentCreatedEvent } from '@shad-tix/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
