import * as fs from 'fs'
import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    MongooseHealthIndicator,
} from '@nestjs/terminus'

// @ts-ignore
import packageJson = require('../package.json')

@Controller()
export class AppController {
    private readonly commitId

    constructor(
        private health: HealthCheckService,
        private mongoose: MongooseHealthIndicator
    ) {
        this.commitId = fs.readFileSync('commit-hash.txt', 'utf8')
    }

    @Get('/health')
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.mongoose.pingCheck('mongoose'),
            async () => ({
                apiVersion: packageJson.version,
                commitId: this.commitId,
            }),
        ])
    }
}
