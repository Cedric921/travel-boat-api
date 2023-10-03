import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Class, Custom, Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(ticketDto: any): Promise<{
    message: string;
    data: Ticket;
  }> {
    try {
      const ticket = await this.prismaService.ticket.create({
        data: ticketDto,
      });
      return { message: 'ticket created', data: ticket };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<{
    message: string;
    data: (Ticket & {
      User: Custom;
      Class: Class;
    })[];
  }> {
    try {
      const tickets = await this.prismaService.ticket.findMany({
        include: { User: true, Class: true },
      });
      return { message: 'tickets fetched', data: tickets };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string) {
    try {
      const ticket = await this.prismaService.ticket.findFirst({
        where: { id },
        include: {
          Class: true,
          User: true,
          BoatProgram: { include: { Boat: true, Program: true } },
        },
      });

      return { message: 'ticket fetched', data: ticket };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByAgence(agenceId: string) {
    try {
      const ticket = await this.prismaService.ticket.findMany({
        where: { Class: { Boat: { agenceId } } },
        include: {
          Class: true,
          User: true,
          BoatProgram: {
            include: { Boat: { include: { agence: true } }, Program: true },
          },
        },
      });

      return { message: 'tickets fetched', data: ticket };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByBoat(boatId: string) {
    try {
      const ticket = await this.prismaService.ticket.findMany({
        where: { Class: { boatId } },
        include: {
          Class: true,
          User: true,
          BoatProgram: {
            include: { Boat: { include: { agence: true } }, Program: true },
          },
        },
      });

      return { message: 'tickets fetched', data: ticket };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, ticketDto: any) {
    try {
      const ticket = await this.prismaService.ticket.update({
        data: { ...ticketDto },
        where: { id },
        include: {
          Class: true,
          User: true,
          BoatProgram: { include: { Boat: true, Program: true } },
        },
      });

      return { message: 'ticket updated', data: ticket };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
