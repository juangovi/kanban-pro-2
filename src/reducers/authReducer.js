export const initialState = {
    auth: { name: '', email: '', password: '', passwordConfirmation: '' },
    loginErrors: { email: "", password: "" },
    signUpErrors: { name: "", email: "", password: "", passwordConfirmation: "" },
    passwordResetErrors: { email: "" },
    loading: false
};

export default function authReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                auth: { ...state.auth, [action.field]: action.value }
            };
        case 'SET_ERRORS_SIGNUP':
            return {
                ...state,
                signUpErrors: action.payload
            };
        case 'SET_ERRORS_LOGIN':
            return {
                ...state,
                loginErrors: action.payload
            };
        case 'SET_ERRORS_PASSWORD_RESET':
            return {
                ...state,
                passwordResetErrors: action.payload
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}