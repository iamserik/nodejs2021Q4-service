import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "../entity/users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (user) {
      return user;
    } else {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateUserDto) {
    try {
      const user = await this.usersRepository.create(payload);
      await user.save();
      return await this.usersRepository.findOne(user.id);
    } catch(error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const response = await this.usersRepository.delete(id);
    if (response.affected) {
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

  async update(id: string, payload: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, payload);
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
