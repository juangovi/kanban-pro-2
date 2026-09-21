export const formReducer = (state, action) => {
    switch (action.type) {
        case 'change_field':
            return {
                ...state,
                campos: { ...state.campos, [action.payload.name]: action.payload.value }
            }
        case 'SET_ERRORS':
            return {
                ...state,
                errores: action.payload
            }
        default:
            return state;
    }
};