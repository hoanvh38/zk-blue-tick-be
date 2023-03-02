import {
    Controller,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipe,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Response } from 'express'

import { AuthGuard } from 'plugins/guards'
import { LIMIT_IMAGE_SIZE } from 'shared/constants'

import { FileEntity } from './entities/file.entity'
import { File } from './model/file.schema'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @UseGuards(AuthGuard)
    @Post('image')
    @UseInterceptors(
        FileInterceptor('image', { limits: { fileSize: LIMIT_IMAGE_SIZE } })
    )
    @HttpCode(HttpStatus.CREATED)
    async uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: /.(gif|jpe?g?|png|webp)$/i,
                    }),
                ],
            })
        )
        file: Express.Multer.File
    ): Promise<FileEntity> {
        let image: File
        if (file.mimetype.includes('gif')) {
            image = await this.storageService.uploadGif(file, {
                manual: true,
            })
        } else {
            image = await this.storageService.uploadImage(file)
        }
        return new FileEntity(image)
    }

    @Get('image/:key')
    async getImage(@Param('key') key: string, @Res() res: Response) {
        this.storageService
            .getImage(key)
            .then((data) => {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                res.write(data.Body, 'binary')
                res.end(null, 'binary')
            })
            .catch(() => {
                res.sendStatus(404)
            })
    }
}
