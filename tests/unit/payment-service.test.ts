import {
  mockEnrollmentReturn,
  mockCardPaymentReturn,
  mockTicketRreturn,
  paymentReturn,
  mockTicketType,
} from '../factories';
import paymentsRepository from '@/repositories/payments-repository';
import paymentsService from '@/services/payments-service';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

describe('getPaymentByTicketId function', () => {
  it('if ticketId is valid', async () => {
    const ticket = await mockTicketRreturn();
    const enrollment = await mockEnrollmentReturn();
    const payment = await paymentReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentsRepository, 'findPaymentByTicketId').mockResolvedValue(payment);

    const resultPayment = await paymentsService.getPaymentByTicketId(enrollment.userId, ticket.id);

    expect(resultPayment).toEqual(payment);
  });
  it('reply with not found if ticket not found', async () => {
    const ticket = await mockTicketRreturn();
    const enrollment = await mockEnrollmentReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentsRepository, 'findPaymentByTicketId').mockResolvedValue(null);

    await expect(paymentsService.getPaymentByTicketId(enrollment.userId, ticket.id)).rejects.toEqual(notFoundError());
  });
});

describe('verifyTicketAndEnrollment function', () => {
  it('should return not found ticket error', async () => {
    const ticketId = 1;
    const userId = 1;

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(null);

    await expect(paymentsService.verifyTicketAndEnrollment(ticketId, userId)).rejects.toEqual(notFoundError());
  });

  it('should return not found ticket error', async () => {
    const userId = 2;
    const ticket = await mockTicketRreturn();
    const enrollment = await mockEnrollmentReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);

    await expect(paymentsService.verifyTicketAndEnrollment(ticket.id, userId)).rejects.toEqual(unauthorizedError());
  });
});

describe('paymentProcess function', () => {
  it('if ticketId is valid', async () => {
    const ticket = await mockTicketRreturn();
    const enrollment = await mockEnrollmentReturn();
    const ticketType = await mockTicketType();
    const payment = await paymentReturn();
    const cardData = await mockCardPaymentReturn();

    jest.spyOn(ticketsRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentsService, 'verifyTicketAndEnrollment').mockResolvedValue(null);
    jest.spyOn(ticketsRepository, 'findTickeWithTypeById').mockResolvedValue(ticketType);
    jest.spyOn(paymentsRepository, 'createPayment').mockResolvedValue(payment);
    jest.spyOn(ticketsRepository, 'ticketProcessPayment').mockResolvedValue(null);

    const resultTicktPaid = await paymentsService.paymentProcess(enrollment.userId, ticket.id, cardData);

    expect(resultTicktPaid).toEqual(payment);
  });
});




