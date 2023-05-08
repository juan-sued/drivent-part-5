import {
  mockTicketTypeNotPaid,
  mockTicketTypeNotIncludesHotel,
  mockTicketType,
  mockBookingRooidReturn,
  mockRoomReturn,
  createBookingReturn,
  mockRoomCapacityReturn,
  mockRoomAllReturn,
  mockBookingIdReturn,
} from '../factories';
import { cannotBookingError, notFoundError } from '@/errors';
import bookingService from '@/services/booking-service';
import ticketService from '@/services/tickets-service';
import bookingRepository from '@/repositories/booking-repository';

describe('createBooking function', () => {
  it('ticket not Found', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('ticket was not paid', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketTypeNotPaid());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('ticket does not include hotel and is not in person', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketTypeNotIncludesHotel());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond not found when bookingId not exist', () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond not found when roomId not exist', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(null);

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond cannot booking error', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomReturn());

    expect(bookingService.createBooking(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond booking created', async () => {
    const userId = 1;
    const roomId = 1;
    const createBooking = await createBookingReturn();

    jest.spyOn(ticketService, 'getTicketByUserId').mockResolvedValue(mockTicketType());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomCapacityReturn());
    jest.spyOn(bookingRepository, 'create').mockResolvedValue(createBooking);

    const resultBooking = await bookingService.createBooking(userId, roomId);
    expect(resultBooking).toEqual(createBooking);
  });
});

describe('getBooking function', () => {
  it('should respond not found if bookings not exist', async () => {
    const userId = 1;

    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(null);

    expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
  });
  it('should respond with Room', async () => {
    const userId = 1;
    const room = await mockRoomAllReturn();

    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(room);
    const resultRomm = await bookingService.getBooking(userId);

    expect(resultRomm).toEqual(room);
  });
});

describe('updateBooking function', () => {
  it('should erro if booking not exist', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(null);

    expect(bookingService.changeBookingRoomById(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should erro if booking !== userId', async () => {
    const userId = 2;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());

    expect(bookingService.changeBookingRoomById(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond not found when bookingId not exist', () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(null);

    expect(bookingService.changeBookingRoomById(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond not found when roomId not exist', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(null);

    expect(bookingService.changeBookingRoomById(userId, roomId)).rejects.toEqual(notFoundError());
  });

  it('should respond cannot booking error', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomReturn());

    expect(bookingService.changeBookingRoomById(userId, roomId)).rejects.toEqual(cannotBookingError());
  });

  it('should respond booking updated', async () => {
    const userId = 1;
    const roomId = 1;
    const bookingId = 1;
    const createBooking = await createBookingReturn();

    jest.spyOn(bookingRepository, 'findBookingByUserId').mockResolvedValue(mockBookingIdReturn());
    jest.spyOn(bookingRepository, 'findByRoomId').mockResolvedValue(mockBookingRooidReturn());
    jest.spyOn(bookingRepository, 'roomIdExist').mockResolvedValue(mockRoomCapacityReturn());
    jest.spyOn(bookingRepository, 'upsertBooking').mockResolvedValue(createBooking);

    const resultBooking = await bookingService.changeBookingRoomById(userId, roomId);
    expect(resultBooking).toEqual(createBooking);
  });
});