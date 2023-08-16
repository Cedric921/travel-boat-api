import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { Custom, User } from '@prisma/client';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getAll() {
    return this.ticketService.getAll();
  }

  @Get('boat/:id')
  getBoatTickets(@Param('id') id: string) {
    return this.ticketService.getByBoat(id);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER']))
  @Get('company')
  getCompanyTickets(@GetUser() user: User) {
    const agenceId = user?.agenceId;
    return this.ticketService.getByAgence(agenceId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.ticketService.getOne(id);
  }

  @Post()
  createTicket(@Body() ticketDto: any) {
    return this.ticketService.createTicket(ticketDto);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() ticketDto: any) {
    return this.ticketService.update(id, ticketDto);
  }
}
