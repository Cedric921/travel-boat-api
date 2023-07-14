import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getAll() {
    return this.ticketService.getAll();
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
