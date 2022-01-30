import { Module } from '@nestjs/common';
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardColumn } from "../entity/columns.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
