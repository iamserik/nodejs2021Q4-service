import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    })],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
