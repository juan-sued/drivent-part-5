import { mockAddressReturn, mockHotelIdReturn, mockHotelReturn, mockTicketType } from '../factories';
import { notFoundError } from '@/errors';
import hotelsService from '@/services/hotels-service';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import hotelRepository from '@/repositories/hotel-repository';

describe('listHotels fucntion', () => {
  it('when not exist enrollament', async () => {
    const userId = 2;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    expect(hotelsService.listHotels(userId)).rejects.toEqual(notFoundError());
  });

  it('when not is Paid', async () => {
    const userId = 1;
    const enrollament = await mockAddressReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollament);
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });
});

describe('getHotels function', () => {
  it('when hotel not exist', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(mockAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(mockTicketType());
    jest.spyOn(hotelRepository, 'findHotels').mockResolvedValue(null);

    expect(hotelsService.getHotels(userId)).rejects.toEqual(notFoundError());
  });

  it('should get hotels', async () => {
    const userId = 1;
    const hotels = await mockHotelReturn();
    const enrollament = await mockAddressReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollament);
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(mockTicketType());
    jest.spyOn(hotelRepository, 'findHotels').mockResolvedValue(hotels);

    const resultHotels = await hotelsService.getHotels(userId);

    expect(resultHotels).toEqual(hotels);
  });
});

describe('getHotelsWithRooms function', () => {
  it('when hotel not exist', async () => {
    const userId = 1;
    const hotelId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(mockAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(mockTicketType());
    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(null);

    expect(hotelsService.getHotelsWithRooms(userId, hotelId)).rejects.toEqual(notFoundError());
  });

  it('should get hotels', async () => {
    const userId = 1;
    const hotelId = 1;
    const hotelRoomId = await mockHotelIdReturn();
    const enrollament = await mockAddressReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollament);
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(mockTicketType());
    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(hotelRoomId);

    const resultHotelId = await hotelsService.getHotelsWithRooms(userId, hotelId);

    expect(resultHotelId).toEqual(hotelRoomId);
  });
});