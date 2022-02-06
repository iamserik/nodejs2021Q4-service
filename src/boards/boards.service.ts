import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '../entity/boards.entity';
import { ColumnsService } from '../columns/columns.service';
import { BoardColumn } from "../entity/columns.entity";

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardsRepository: Repository<Board>) {
  }
  async getAll(): Promise<Board[]> {
    const boards = await this.boardsRepository.find({ loadEagerRelations: true });

    return boards;
  }

  async getById(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(id, { loadEagerRelations: true });

    if (board) {
      return board;
    } else {
      throw new HttpException(
        `Board with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateBoardDto): Promise<Board> {
    try {
      const board = await this.boardsRepository.create({ title: payload.title });
      await board.save();
      for (const col of payload.columns) {
        await getRepository(BoardColumn).save({ ...col, board });
      }
      return await this.getById(board.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete(id: string): Promise<void> {
    const response = await this.boardsRepository.delete(id);
    if (!response.affected) {
      throw new HttpException(
        `Board with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, payload: UpdateBoardDto): Promise<Board> {
    const board = await this.boardsRepository.update(id, { title: payload.title });
    if (board) {
      return this.getById(id);
    } else {
      throw new HttpException(
        `Board with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
