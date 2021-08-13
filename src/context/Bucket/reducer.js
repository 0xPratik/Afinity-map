import {ADD_BUCKET,DELETE_BUCKET,ADD_HIGHLIGHT_BUCKET} from "./Actions.types"



export default (state,action) => {
    switch(action.type)
    {
        case ADD_BUCKET:
            return [...state,action.payload]
        case DELETE_BUCKET:
            return state.filter(b => b.id !== action.payload)
        case ADD_HIGHLIGHT_BUCKET:
            return state.map(elem => {
                if(elem.id === action.payload.bucket_id)
                {
                    console.log("ELEEMENT",elem);
                    // elem.highlights.push(action.payload.id);
                }
            })
        default:
            return state;
    }
}