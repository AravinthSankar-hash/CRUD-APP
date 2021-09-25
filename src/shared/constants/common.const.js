export const APP_CONST = {
    LOGIN_IN: {
        DEFAULT_VALUES: {
            email: '',
            password: '',
        }
    },
    REGISTRATION: {
        DEFAULT_VALUES: {
            name: '',
            email: '',
            location: '',
            contact: '',
            password: '',
        }
    },
    ADMIN_ID: 'systemadmin@poorvika.com',
}

export const BASE_URL = 'http://localhost:3001/'

export const APP_URL = {
    SAVE_USER: `${BASE_URL}users/create`,
    VALIDATE_USER: `${BASE_URL}users/login`,
    FETCH_ALL_USERS: `${BASE_URL}users/list`,
    DELETE_USER: `${BASE_URL}users/remove/`,
    UPDATE_USER: `${BASE_URL}users/update/`,
}

export const HTTP_METHODS = {
    UPDATE: {
        method: 'PUT',
    },
    DELETE: {
        method: 'DELETE',
    },
    POST: {
        method: 'POST',
    },
    GET: {
        method: 'GET',
    }
};

export const HEADER_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
        'authorization': '',
    },
};

export const STATUS_CODE = {
    SUCCESS: 200,
    UNAUTH: 401,
};

export const USER_RESPONSE = {
    LOGIN_SUCCESS: 'Login Successful',
    FAILED: 'Failed! Try again'
};