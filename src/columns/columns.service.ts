import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardColumn } from "../entity/columns.entity";
import { CreateColumnDto } from "./dto/create-column.dto";

@Injectable()
export class ColumnsService {
  constructor(@InjectRepository(BoardColumn) private columnRepository: Repository<BoardColumn>) {
  }

  create(payload: CreateColumnDto) {
    this.columnRepository.create(payload);
  }
}
