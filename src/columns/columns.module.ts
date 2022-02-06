import { forwardRef, Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from '../entity/columns.entity';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardColumn]),
    forwardRef(() => BoardsModule),
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}
