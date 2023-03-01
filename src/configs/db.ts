import * as dotEnv from 'dotenv'

dotEnv.config()

export const db = {
    development: {
        IS_DEBUG: true,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: true, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
    test: {},
    staging: {
        IS_DEBUG: false,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
    production: {
        IS_DEBUG: false,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false, // Don't build indexes
            retryAttempts: Number.MAX_VALUE, // Never stop trying to reconnect
            retryDelay: 500, // Reconnect every 500ms
            useUnifiedTopology: true,
        },
    },
}
