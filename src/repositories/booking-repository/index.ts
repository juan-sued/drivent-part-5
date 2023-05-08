import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  console.log(roomId)
  return prisma.booking.findMany({
    where: {
      roomId:roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}
async function findBookingByUserId(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

async function roomIdExist(roomId: number) {
  return await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
  roomIdExist,
  findBookingByUserId
};

export default bookingRepository;
