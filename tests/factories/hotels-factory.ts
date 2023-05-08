import faker from '@faker-js/faker';
import { prisma } from '@/config';

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 3,
      hotelId: hotelId,
    },
  });
}


export async function mockHotelReturn() {
  return [
    {
      id: 1,
      name: 'belo hotel',
      image: 'image-teste',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function mockHotelIdReturn() {
  return {
    id: 1,
    name: 'Teste',
    image: 'teste image',
    createdAt: new Date(),
    updatedAt: new Date(),
    Rooms: [
      {
        id: 1,
        name: 'Teste',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
}