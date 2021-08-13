import {ADD_HIGHLIGHT,DELETE_HIGHLIGHT,UPDATE_HIGHLIGHT} from "./Actions.types"

export default (state,action) => {
    switch(action.type)
    {
        case ADD_HIGHLIGHT:
        return [...state,action.payload]
        case DELETE_HIGHLIGHT:
            return state.filter(highlight => highlight.id !== action.payload)  
        case UPDATE_HIGHLIGHT:
            let updateHighlight = state.map(hi => {
                if(hi.id === action.payload.id)
                {
                    hi.content = action.payload.newContent;
                    hi.user_name = action.payload.newUser;
                    hi.bucketId = action.payload.bucket_id;
                }
                return hi;
            })
            return updateHighlight;
        default:
            return state;
    }
}