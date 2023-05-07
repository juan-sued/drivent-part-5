/* eslint-disable quotes */
import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

type CreateBookingParams = {
  roomId: number;
  userId: number;
};

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function getBookingReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: null,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'Room 1',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export async function mockBookingRooidReturn() {
  return [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: 'ze da manga',
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];
}

export async function mockRoomReturn() {
  return {
    id: 1,
    name: 'ze da manga',
    capacity: 0,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
export async function mockRoomCapacityReturn() {
  return {
    id: 1,
    name: 'ze da manga',
    capacity: 5,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function createBookingReturn() {
  return {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function mockRoomAllReturn() {
  return {
    id: 1,
    Room: {
      id: 1,
      name: 'ze da manga',
      capacity: 5,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function mockBookingIdReturn() {
  return {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
