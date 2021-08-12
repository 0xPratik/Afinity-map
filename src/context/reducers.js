import {ADD_HIGHLIGHT,DELETE_HIGHLIGHT,ADD_BUCKET} from "./Actions.types"

export default (state,action) => {
    switch(action.type)
    {
        case ADD_HIGHLIGHT:
        return [...state,action.payload]
        case DELETE_HIGHLIGHT:
            return state.filter(highlight => highlight.id !== action.payload)   
        default:
            return state;
    }
}