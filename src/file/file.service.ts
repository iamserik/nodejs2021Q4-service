import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(file): Promise<Record<string, string>> {
    try {
      const ext = file.originalname.split('.').reverse()[0]
      const fileName = randomUUID() + '.' + ext;
      const filePath = path.resolve(__dirname, '..', 'uploads/file');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return { message: 'File uploaded successfully', file_name: fileName };
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
