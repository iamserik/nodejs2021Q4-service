import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { validateId } from "../common/utils";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string
  ) {
    validateId(id);
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id')
               id: string
  ) {
    validateId(id);
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body()
               payload: UpdateUserDto, @Param('id')
               id: string
  ) {
    validateId(id);
    return this.usersService.update(id, payload);
  }
}
