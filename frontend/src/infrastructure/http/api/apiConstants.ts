const apiConstants = {
    ACCESS_TOKEN_NAME: 'access-token',
    DEFAULT_ERROR_MESSAGE: 'An unexpected server error occurred',

    routes: {
        auth: {
            SIGN_IN: '/auth/signin',
            SIGN_UP: '/auth/register',
            REFRESH: '/auth/refresh'
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
    }
}

Object.freeze(apiConstants);

export default apiConstants;
