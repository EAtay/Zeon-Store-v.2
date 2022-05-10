const inistialState = {
    bestsellerlimit: [],
    bestsellerId: [],
    bestsellerlimitg: [],
    bestseller: [],
    bestsellervalue: [],
    collectionlimit: [],
    collection: [],
    collectionId: [],
    advantage: [],
    slider: [],
    about: [],
    help: [],
    public: [],
    inform: [],
    value: "",
    basket: [],
    favorites: [],
    cart: [],
    nuber: []
}
export const productsReducer = (state = inistialState, action) => {

    switch (action.type) {
        case "GET_BESTSELLERLIMIT":
            return {
                ...state,
                bestsellerlimit: action.data
            }
        case "GET_BESTSELLER":
            return {
                ...state,
                bestseller: action.data
            }
        case "GET_BESTSELLERVALUE":
            return {
                ...state,
                bestsellervaleu: action.data
            }
        case "GET_BESTSELLERLIMITG":
            return {
                ...state,
                bestsellerlimitg: action.data
            }
        case "GET_BESTSELLERID":
            return {
                ...state,
                bestsellerId: action.data
            }
        case "GET_COLLECTION":
            return {
                ...state,
                collection: action.data
            }
        case "GET_COLLECTIONID":
            return {
                ...state,
                collectionId: action.data
            }
        case "GET_COLLECTIONLIMIT":
            return {
                ...state,
                collectionlimit: action.data
            }
        case "SET_VALUE":
            return {
                ...state,
                value: action.data
            }
        case "GET_ADVANTAGE":
            return {
                ...state,
                advantage: action.data
            }
        case "GET_HELP":
            return {
                ...state,
                help: action.data
            }
        case "GET_ABOUT":
            return {
                ...state,
                about: action.data
            }
        case "GET_SLIDER":
            return {
                ...state,
                slider: action.data
            }
        case "GET_FAVORITES":
            return {
                ...state,
                favorites: action.data
            }
        case "GET_basket":
            return {
                ...state,
                basket: action.data
            }
        case "GET_PUBLIC":
            return {
                ...state,
                public: action.data
            }
        case "GET_INFORM":
            return {
                ...state,
                inform: action.data
            }
        case "GET_CART":
            return {
                ...state,
                cart: action.data
            }
        case "GET_NUMBER":
            return {
                ...state,
                number: action.data
            }
        default: return state
    }
}