export default (state,action)=> {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                ...state,
                loading:false,
                users:[...state.users, action.payload],
                message: action.message
            }
        
        case 'SIGN_IN':
            return {
                ...state,
                loading:false,
                token: action.payload
            }

        case 'READ_USER':
            return {
                ...state,
                user: action.payload
            }
        
        default:
            return state
    }
}