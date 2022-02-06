import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from '../entity/boards.entity';
import { AuthModule } from '../auth/auth.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule,
    // forwardRef(() => ColumnsModule),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
