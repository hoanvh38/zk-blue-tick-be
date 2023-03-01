import { ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from 'app.module'
import { port } from 'configs'
import { json } from 'express'

import { AllExceptionsFilter } from 'plugins/filters'
import { TransformInterceptor } from 'plugins/interceptors'

// @ts-ignore
import packageJson = require('../package.json')

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    //Resolve cors
    app.enableCors({ origin: true })
    //option for producer
    const httpAdapterHost = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost))
    app.useGlobalInterceptors(new TransformInterceptor())
    app.setGlobalPrefix('main-service')
    app.enableVersioning({
        type: VersioningType.URI,
    })
    app.use(json({ limit: '600kb' }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
        })
    )
    await app.listen(port)
    console.log(
        `Zk blue tick main service v${packageJson.version} running on port ${port}`
    )
}

bootstrap()
