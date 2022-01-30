import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, BoardsModule, TypeOrmModule.forRoot(), TasksModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
