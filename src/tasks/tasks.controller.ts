import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { validateId } from "../common/utils";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param('boardId') boardId: string) {
    validateId(boardId);
    return this.tasksService.getAll(boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('taskId') taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.getById(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()
           payload: CreateTaskDto, @Param('boardId') boardId: string
  ) {
    validateId(boardId);
    return this.tasksService.create({ ...payload, boardId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('taskId')
           taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.delete(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':taskId')
  update(@Body()
           payload: CreateTaskDto, @Param('taskId')
           taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.update(taskId, payload);
  }
}
