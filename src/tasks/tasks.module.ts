import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from '../entity/tasks.entity';
import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../boards/boards.module';
import { UsersModule } from '../users/users.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    BoardsModule,
    UsersModule,
    ColumnsModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
