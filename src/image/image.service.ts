import { MultipartFile } from "@fastify/multipart";
import { TesseractService } from "src/tesseract/tesseract.service";
import { SharpService } from "src/sharp/sharp.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { extractBuffer } from "src/utils";

@Injectable()
export class ImageService {
  constructor(
    private readonly tesseract: TesseractService,
    private readonly sharp: SharpService
  ) { }
  async
  async recognize(file: MultipartFile) {
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new InternalServerErrorException(error);
    const text = await this.tesseract.recognize(buffer);
    return text
  }
  async recognizeArea(file?: MultipartFile) {
    const croppedImage = await this.sharp.crop('./test.png', {
      left: 1300, top: 79, width: 200, height: 30
    })
    const { data: { text } } = await this.tesseract.recognize(croppedImage)
    return this.tesseract.clear(text)
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
    const recognizedTexts = await this.tesseract.recognizeMultiple(croppedImages)
    return recognizedTexts.map(({ data }) => this.tesseract.clear(data.text))
  }
}