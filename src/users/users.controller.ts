import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { validateId } from "../common/utils";
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
    validateId(id);
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()
               payload: CreateUserDto
  ) {
    if (!payload.name || !payload.login || !payload.password) {
      throw new HttpException('Name, login and password all required', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id')
               id: string
  ) {
    validateId(id);
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Body()
               payload: UpdateUserDto, @Param('id')
               id: string
  ) {
    validateId(id);
    return this.usersService.update(id, payload);
  }
}
