import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export async function createTicketTypeRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}


export async function mockTicketTypeReturn() {
  return [
    {
      id: 1,
      name: 'Presencial',
      price: 5000,
      isRemote: false,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export async function mockTicketRreturn() {
  return {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    Enrollment: {
      id: 1,
      name: 'Teste',
      cpf: '000.000.000-00',
      birthday: new Date(),
      phone: '90000-0000',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function mockCardPaymentReturn() {
  return {
    issuer: '78946532131',
    number: 123,
    name: 'Teste',
    expirationDate: new Date(),
    cvv: 213,
  };
}

export async function mockTicketType() {
  return {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: false,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function mockTicketTypeNotPaid() {
  return {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.RESERVED,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: false,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function mockTicketTypeNotIncludesHotel() {
  return {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: false,
      includesHotel: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}
