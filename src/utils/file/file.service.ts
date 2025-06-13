import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PathLike } from 'fs';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class FileService {
    static async readFile(filePath: string): Promise<string> {
        try {
            const data = await readFile(filePath, 'utf-8')
            return data;
        } catch (error) {
            throw new InternalServerErrorException("Error reading the file");
        }
    }

    static async writeFile(filePath: PathLike, data: string): Promise<void> {
        try {
            await writeFile(filePath, data, 'utf-8');
        } catch (error) {
            throw new InternalServerErrorException("Error writing to the file");
        }
    }
}