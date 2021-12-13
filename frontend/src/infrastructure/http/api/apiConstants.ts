const apiConstants = {
    ACCESS_TOKEN_NAME: 'access-token',
    DEFAULT_ERROR_MESSAGE: 'An unexpected server error occurred',

    routes: {
        auth: {
            SIGN_IN: '/auth/signin',
            SIGN_UP: '/auth/register',
            REFRESH: '/auth/refresh',
            RESEND: '/auth/confirmation/resend',
            VALIDATE_TOKEN: '/auth/confirmation'
        },
        publicApproach: {
            BASE: '/approaches/public'
        },
        section: {
            BASE: '/sections'
        },
        categories: {
            INITIAL: '/categories',
            ROOT: '/categories/root',
            PATHS: '/paths'
        },
        users: {
            BASE: '/users',
            CURRENT: '/current'
        },
        search: {
            SEARCH: '/search',
            PRE_SEARCH: '/search/suggest'
        },
        protocol: {
            BASE: '/protocols',
            DRAFT: '/draft'
        }
    },

    search: {
        query: "query",
        MIN_LENGTH: 2,
        MAX_LENGTH: 70,
        SUGGEST_BUNDLE_SIZE: 5,
        SUGGEST_UPDATE_INTERVAL_MS: 300
    },

    common: {
        ROOT_ID: -1
    },

    errors: {
        MISSING_PROPERTY_NAME: 400_001,
        NO_PARENT_CATEGORIES: 400_002,
        INVALID_PROPERTY_NAME: 400_003,
        USER_ALREADY_EXISTS: 400_004,
        REGULAR_EXPRESSION_VALIDATION_FAILED: 400_005,
        REVIEW_REQUEST_ALREADY_EXISTS: 400_006,

        INVALID_REFRESH_TOKEN: 401_001,
        EXPIRED_REFRESH_TOKEN: 401_002,
        INVALID_ACCESS_TOKEN: 401_003,
        EXPIRED_ACCESS_TOKEN: 401_004,
        WRONG_CREDENTIALS: 401_005,
        UNCHECKED_EMAIL: 401_006,
        INVALID_VERIFICATION_TOKEN: 401_007,
        EXPIRED_VERIFICATION_TOKEN: 401_008,

        PERMISSION_DENIED: 403_000,

        CATEGORY_NOT_FOUND: 404_001,
        PARENT_CATEGORY_NOT_FOUND: 404_002,
        APPROACH_NOT_FOUND: 404_003,
        USER_BY_EMAIL_NOT_FOUND: 404_004,
        USER_NOT_FOUND: 404_005,
        SECTION_NOT_FOUND: 404_006,
        PROTOCOL_NOT_FOUND: 404_007,

        BACKEND_APOLOGIZES: 500_000
    }
}

Object.freeze(apiConstants);

export default apiConstants;
