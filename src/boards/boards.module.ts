import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from '../entity/boards.entity';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
