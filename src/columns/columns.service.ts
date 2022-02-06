import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardColumn } from '../entity/columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(@InjectRepository(BoardColumn) private columnRepository: Repository<BoardColumn>,
              private boardsService: BoardsService) {
  }

  async getById(payload: string) {
    const col = await this.columnRepository.findOne(payload);
    if (col) {
      return col;
    } else {
      throw new HttpException(
        `Column with id ${payload} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateColumnDto) {
    const { title, order, boardId } = payload;
    const board = await this.boardsService.getById(boardId);

    this.columnRepository.create({
      title,
      order,
      board,
    });
  }
}
