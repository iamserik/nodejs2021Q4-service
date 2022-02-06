import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entity/tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { BoardsService } from "../boards/boards.service";
import { UsersService } from "../users/users.service";
import { ColumnsService } from "../columns/columns.service";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>,
              private boarsService: BoardsService,
              private usersService: UsersService,
              private columnsService: ColumnsService) {
  }

  async getAll(boardId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: [{ boardId: boardId }], loadRelationIds: true });

    return tasks;
  }

  async getById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (task) {
      return task;
    } else {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(payload: CreateTaskDto): Promise<Task> {
    const {title, description, order, boardId, userId, columnId} = payload;

    const board = await this.boarsService.getById(boardId);

    if (!board) {
      throw new HttpException('Board does not exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const task = await this.tasksRepository.create({
        title,
        description,
        order,
        ...userId && { userId: await this.usersService.getById(userId) },
        boardId: board,
        ...columnId && { columnId: await this.columnsService.getById(columnId) },
      });

      await task.save();

      return await this.getById(task.id);
    } catch(err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete(id: string): Promise<void> {
    const response = await this.tasksRepository.delete(id);
    if (!response.affected) {
      throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const { title, description, order, boardId, userId, columnId } = payload;

    const board = await this.boarsService.getById(boardId);

    const task = await Task.update(id, {
      title,
      description,
      order,
      ...userId && { userId: await this.usersService.getById(userId) },
      boardId: board,
      ...columnId && { columnId: await this.columnsService.getById(columnId) }
    });

    if (task) return await this.getById(id);
    else throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
