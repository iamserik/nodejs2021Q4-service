import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { validateId } from "../common/utils";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param() boardId: string) {
    validateId(boardId);
    return this.tasksService.getAll(boardId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param() taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.getById(taskId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()
           payload: CreateTaskDto, @Param() boardId: string
  ) {
    validateId(boardId);
    return this.tasksService.create({ ...payload, boardId });
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('taskId')
           taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.delete(taskId);
  }

  @Put(':taskId')
  update(@Body()
           payload: CreateTaskDto, @Param('taskId')
           taskId: string
  ) {
    validateId(taskId);
    return this.tasksService.update(taskId, payload);
  }
}
