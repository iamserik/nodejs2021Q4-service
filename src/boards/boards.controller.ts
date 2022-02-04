import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.boardService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string
  ) {
    return this.boardService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()
               board: CreateBoardDto
  ) {
    return this.boardService.create(board);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id')
               id: string
  ) {
    return this.boardService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body()
               board: UpdateBoardDto, @Param('id')
               id: string
  ) {
    return this.boardService.update(id, board);
  }
}
