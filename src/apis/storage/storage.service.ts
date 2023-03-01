import * as sharp from 'sharp'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import 'multer'
import { v4 as uuid } from 'uuid'

import { AwsS3Service } from 'frameworks/aws-s3-service/aws-s3.service'
import { COLLECTION, ERROR, FILE_TYPE } from 'shared/constants'
import Utility from 'shared/helpers/utility'

import { File } from './model/file.schema'

@Injectable()
export class StorageService {
    constructor(
        @InjectModel(COLLECTION.FILE)
        private readonly FileUploadModel: Model<File>,
        private readonly awsS3Service: AwsS3Service
    ) {}

    async uploadImage(
        file: Express.Multer.File,
        option?: { isNft?: boolean; name?: string }
    ): Promise<File> {
        try {
            // eslint-disable-next-line prefer-const
            let { isNft, name } = option || {}
            name && (name = Utility.createSlugFromString(name))
            if (isNft) {
                const isExist: File = await this.FileUploadModel.findOne({
                    url: `/image/${file.filename}`,
                })
                if (isExist) {
                    return isExist
                }
            }
            const image = await sharp(file.buffer)
            const metadata = await image.metadata()

            const uploadResult = await this.awsS3Service.uploadFile(
                isNft
                    ? file.filename
                    : name || `${uuid()}-${new Date().getTime()}`,
                image.clone(),
                metadata.width,
                metadata.height
            )

            const createImage: File = new this.FileUploadModel({
                url: `/image/${uploadResult.Key}`,
                size: file.size,
                key: uploadResult.Key,
                type: FILE_TYPE.IMAGE,
                width: metadata.width,
                height: metadata.height,
                lastRequest: new Date(),
            })

            return createImage.save()
        } catch (error) {
            throw new BadRequestException(ERROR.SOMETHING_WAS_WRONG)
        }
    }

    async uploadGif(
        file: Express.Multer.File,
        option?: { manual?: boolean }
    ): Promise<File> {
        // eslint-disable-next-line prefer-const
        const { manual } = option || {}
        const key = manual
            ? `${new Date().getTime()}-${file.originalname}`
            : file.originalname

        const uploadResult = await this.awsS3Service.uploadGifFile(
            Utility.createSlugFromString(key),
            file.buffer
        )

        const createImage: File = new this.FileUploadModel({
            url: `/image/${uploadResult.Key}`,
            size: file.size,
            key: uploadResult.Key,
            type: FILE_TYPE.GIF,
            width: 500,
            height: 500,
            lastRequest: new Date(),
        })

        return createImage.save()
    }

    async getImage(key: string) {
        await this.FileUploadModel.findOneAndUpdate(
            { key: key },
            { lastRequest: new Date().getTime() }
        )
        return this.awsS3Service.getFile(key)
    }
}
