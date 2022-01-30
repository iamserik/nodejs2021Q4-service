import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "../entity/boards.entity";

const columns = [
  { title: 'Backlog', order: 1 },
  { title: 'Sprint', order: 2 },
]

type TBoard = {
  id: string;
  title: string;
  columns: Record<string, string | number>[];
}

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardsRepository: Repository<Board>) {
  }
  async getAll(): Promise<Board[]> {
    const boards = await this.boardsRepository.find();

    return boards;
  }

  async getById(id: string): Promise<TBoard> {
    const board = await this.boardsRepository.findOne(id);

    if (board) {
      return { ...board, columns };
    } else {
      throw new HttpException(
        `Board with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateBoardDto): Promise<TBoard> {
    try {
      const board = await this.boardsRepository.create(payload);
      await board.save();
      return { ...board, columns };
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

  async update(id: string, payload: UpdateBoardDto): Promise<TBoard> {
    await this.boardsRepository.update(id, { title: payload.title });
    const board = await Board.findOne(id);
    if (board) {
      return { ...board, columns };
    } else {
      throw new HttpException(
        `Board with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
