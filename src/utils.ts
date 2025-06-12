import { MultipartFile } from "@fastify/multipart"

export async function extractBuffer(data: MultipartFile) {
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