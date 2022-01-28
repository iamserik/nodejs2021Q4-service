/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string
  ) {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body()
               user: CreateUserDto
  ) {
    return this.usersService.create(user);
  }

  @Delete(':id')
  deleteUser(@Param('id')
               id: string
  ) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Body()
               user: UpdateUserDto, @Param('id')
               id: string
  ) {
    return `User ${user.name} with password ${user.password} id ${id}`;
  }
}
