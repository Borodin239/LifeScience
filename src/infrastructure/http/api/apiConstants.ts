const apiConstants = {
    ACCESS_TOKEN_NAME: 'access-token',
    DEFAULT_ERROR_MESSAGE: 'An unexpected server error occurred',

    routes: {
        auth: {
            SIGN_IN: '/auth/signin',
            SIGN_UP: '/auth/register',
            REFRESH: '/auth/refresh'
        },
        categories: {
            INITIAL: '/categories',
            ROOT: '/categories/root'
        },
        search: {
            SEARCH: '/search'
        }
    },

    search: {
        query: "query",
    },

    common: {
        ROOT_ID: -1
    }
}

Object.freeze(apiConstants);

export default apiConstants;
