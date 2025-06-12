import { MultipartFile } from "@fastify/multipart";
import { PrismaService } from "src/prisma.service";
import { CloudinaryService } from "./cloudinary.service";
import { TesseractService } from "src/tesseract/tesseract.service";
import { SharpService } from "src/sharp/sharp.service";
import { InternalServerErrorException } from "@nestjs/common";

export class ImageService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly tesseract: TesseractService,
        private readonly sharp: SharpService
    ) { }
    async extractBuffer(data: MultipartFile) {
        try {
            console.log('Extracting buffer from:', data.filename)
            const buffer = await data.toBuffer()
            if (!buffer || buffer.length === 0) {
                throw new Error('File is empty or not readable')
            }
            return {
                error: null,
                buffer,
            }
        } catch (error) {
            return {
                error: error.message as string,
                buffer: Buffer.from([]),
            }
        }
    }
    async recognize(file: MultipartFile) {
        const { error, buffer } = await this.extractBuffer(file)
        if (error) throw new InternalServerErrorException(error);
        const text = await this.tesseract.recognize(buffer);
        return text
    }
    async cropAndRecognize(file?: MultipartFile) {
        //const { error, buffer: _ } = await this.extractBuffer(file)
        //if (error) throw new InternalServerErrorException(error);
        const croppedImages = await this.sharp.cropMultipleZones('./test.png', [
            { left: 60, top: 200, width: 180, height: 100 },
            { left: 680, top: 200, width: 180, height: 100 },
            { left: 1100, top: 200, width: 180, height: 100 },
            { left: 60, top: 560, width: 180, height: 100 },
            { left: 260, top: 720, width: 180, height: 100 },
            { left: 840, top: 900, width: 180, height: 100 },
            { left: 1180, top: 900, width: 180, height: 100 },
            { left: 1470, top: 840, width: 180, height: 100 },
            { left: 1506, top: 340, width: 180, height: 100 },
        ]);
        const recognizedTexts = await this.tesseract.recognizeMultiple(croppedImages);
        return recognizedTexts.map(({ data }) => this.tesseract.clear(data.text))
    }

    findAllImages() {
        return this.cloudinaryService.findAll();
    }
}