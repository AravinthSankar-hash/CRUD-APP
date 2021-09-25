import { APP_URL, HEADER_OPTIONS, HTTP_METHODS } from '../constants/common.const';

const AppService = {
    getAllRegisteredUsers: async () => {
        HEADER_OPTIONS.headers.authorization = sessionStorage.getItem('token');
        let requestOptions = {
            ...HTTP_METHODS.GET, ...HEADER_OPTIONS,
        };
        return (await fetch(APP_URL.FETCH_ALL_USERS, requestOptions)).json();
    },

    removeUserDataByEmail: async (emailId) => {
        HEADER_OPTIONS.headers.authorization = sessionStorage.getItem('token');
        const deleteRequestOptions = {
            ...HTTP_METHODS.DELETE, ...HEADER_OPTIONS,
        };
        return (await fetch(`${APP_URL.DELETE_USER}${emailId}`, deleteRequestOptions)).json();
    },

    updateUserData: async (emailId, body) => {
        HEADER_OPTIONS.headers.authorization = sessionStorage.getItem('token');
        const updateRequestOptions = {
            ...HTTP_METHODS.UPDATE, ...HEADER_OPTIONS, ...body,
        };
        return (await fetch(`${APP_URL.UPDATE_USER}${emailId}`,updateRequestOptions)).json();
    },

    validateUserLogin: async (body) => {
        const loginReqOptions = {
            ...HTTP_METHODS.POST, ...HEADER_OPTIONS, ...body,
        };
        return (await fetch(APP_URL.VALIDATE_USER, loginReqOptions)).json();
    },

    saveUser: async (body) => {
        const saveUserReqOptions = {
            ...HTTP_METHODS.POST, ...HEADER_OPTIONS, ...body,
        };
        return (await fetch(APP_URL.SAVE_USER, saveUserReqOptions)).json();
    }
}

export default AppService;
