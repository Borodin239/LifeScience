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
            GET: '/approaches/public'
        },
        section: {
            GET: '/sections'
        },
        categories: {
            INITIAL: '/categories',
            ROOT: '/categories/root'
        }
    },
    common: {
        ROOT_ID: -1
    }
}

Object.freeze(apiConstants);

export default apiConstants;
