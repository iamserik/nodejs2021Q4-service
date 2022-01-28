import { randomUUID } from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return user;
    } else {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  create(user: CreateUserDto) {
    const newUser = {
      ...user,
      id: randomUUID(),
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string): { message: string } {
    const index = this.users.findIndex((user) => user.id === id);
    if (index) {
      this.users.splice(index, 1);
      return {
        message: 'User successfully deleted',
      };
    } else {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: string, user: UpdateUserDto): UpdateUserDto {
    const dbUser = this.users.find((user) => user.id === id);
    if (dbUser) {
      dbUser.name = user.name;
      dbUser.password = user.password;
      dbUser.login = user.login;
      return dbUser;
    } else {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
