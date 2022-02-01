import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from "../entity/users.entity";

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getByLogin(userDto.login);

    if (candidate) {
      throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { login: user.login, id: user.id };
    return { token: this.jwtService.sign(payload) }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(userDto.password, user?.password || '');

    if(user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Некорректный логин или пароль' });
  }
}
