import { FACT_VALIDATION_PROGRESS, FACT_VALIDATION_PASS, FACT_VALIDATION_FAILED } from '../actions/actionTypes';
const INITIAL_STATE = {
    error: null,
    message: null,
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACT_VALIDATION_PROGRESS:
            return { ...state, isLoading: action.payload.isLoading, error: null, message: null}
        case FACT_VALIDATION_PASS:
            return { ...state, isLoading: false, error: null, message: action.payload.data}
        case FACT_VALIDATION_FAILED:
            return { ...state, isLoading: false, error: action.payload.error, message: null}
        default:
            return state
    }
}