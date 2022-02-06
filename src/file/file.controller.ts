import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.fileService.createFile(file);
  }
}
