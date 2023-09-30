import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER', 'ADMIN']))
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER', 'ADMIN']))
  @Get('agence')
  getCompanyUsers(@GetUser() user: User) {
    return this.userService.getAgenceUsers(user.agenceId);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN']))
  @Get('admins')
  getAdmins() {
    return this.userService.getAdmins();
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER', 'ADMIN']))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER', 'ADMIN']))
  @Post()
  createUser(@Body() dto: any, @GetUser() user: User) {
    return this.userService.create({ ...dto, agenceId: user.agenceId });
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['USER', 'ADMIN']))
  @Put(':id')
  updateById(@Param('id') id: string, @Body() dto: any) {
    return this.userService.updateById(id, dto);
  }
}
