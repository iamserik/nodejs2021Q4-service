import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.boardService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string
  ) {
    return this.boardService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()
               board: CreateBoardDto
  ) {
    return this.boardService.create(board);
  }

  @Delete(':id')
  delete(@Param('id')
               id: string
  ) {
    return this.boardService.delete(id);
  }

  @Put(':id')
  update(@Body()
               board: UpdateBoardDto, @Param('id')
               id: string
  ) {
    return this.boardService.update(id, board);
  }
}
