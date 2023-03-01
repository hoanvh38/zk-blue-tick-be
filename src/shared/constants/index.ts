export enum COLLECTION {
    USER = 'users',
    FILE = 'file',
    VERIFY_LOGIN = 'verify_login',
}
export enum ROLE {
    ADMIN = 'ADMIN',
    SUPPORT = 'SUPPORT',
    USER = 'USER',
}

export enum REQUEST_STATUS {
    WAITING = 'waiting',
    APPROVED = 'approved',
    CANCEL = 'cancel',
}

export enum REDIS_KEY {
    SYSTEM_CONFIG = 'system_config',
}

export enum SortType {
    asc = 'asc',
    desc = 'desc',
}

export enum LANGUAGE {
    ENGLISH = 'English',
}

export enum BASE_VALUE {
    TTL_ACCESS_TOKEN_REDIS = 300,
    TTL_TOKEN_REDIS = 24 * 3600 * 2,
    LIMIT = 12,
    OFFSET = 0,
}

export enum FILE_TYPE {
    IMAGE = 'image',
    GIF = 'gif',
}

export enum ERROR {
    INTERNAL_SERVER_ERROR = 'error.internal_server_error',
    INVALID_TOKEN = 'error.auth.invalid_token',
    TOKEN_IS_EMPTY = 'error.auth.token_is_empty',
    USER_BLOCKED = 'error.user.user_is_blocked',
    CAN_NOT_FIND_USER = 'error.user.can_not_find_user',
    LIMIT_RATE = 'error.limit_rate',
    NOT_FOUND = 'error.not_found',
    USER_NOT_YET_REGISTERED = 'error.user_not_yet_registered',
    CONFIRM_CODE_NOT_VALID = 'error.confirm_code_not_valid',
    ACCESS_DENIED = 'error.access_denied',
    BODY_WAS_WRONG = 'error.body_was_wrong',
    ALREADY_CREATED = 'error.already_created',
    SOMETHING_WAS_WRONG = 'error.something_was_wrong',
}

export const LIMIT_IMAGE_SIZE = 10 * 1024 * 1024
