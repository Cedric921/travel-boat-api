import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Post()
  createUser(@Body() dto: any) {
    return this.userService.create(dto);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.userService.updateById(id, dto);
  }
}
