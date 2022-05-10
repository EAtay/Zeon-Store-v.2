import axios from "axios"
export function getProdcutBestLimit(page, limit) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/products?_page=${page}&_limit=${limit}`)
        dispatch({
            type: "GET_BESTSELLERLIMIT",
            data
        })
    }
}
export function getProdcutBestG(page, limitq) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/products?_page=${page}&_limit=${limitq}`)
        dispatch({
            type: "GET_BESTSELLERLIMITG",
            data
        })
    }
}
export function getProdcutBest() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/products`)
        dispatch({
            type: "GET_BESTSELLER",
            data
        })
    }
}
export function getProdcutBestValue(value) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/products?q=${value}`)
        dispatch({
            type: "GET_BESTSELLERVALUE",
            data
        })
    }
}
export function getProdcutBestId(id) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/products/${id}`)
        dispatch({
            type: "GET_BESTSELLERID",
            data
        })
    }
}
// COLLECTION
export function getProdcutColLim(limit) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/collection/?_limit=${limit}`)
        dispatch({
            type: "GET_COLLECTIONLIMIT",
            data
        })
    }
}

export function getProdcutCollectionId(id) {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/collection/${id}`)
        dispatch({
            type: "GET_COLLECTIONID",
            data
        })
    }
}
export function getProdcutCollection() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/collection`)
        dispatch({
            type: "GET_COLLECTION",
            data
        })
    }
}
// FAVORITES
export function getFavorites() {
    return (dispatch) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (!favorites) {
            favorites = {
                products: []
            }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
        dispatch({
            type: "GET_FAVORITES",
            data: favorites.products
        })
    }
}
// basket
export function getbasket() {
    return (dispatch) => {
        let basket = JSON.parse(localStorage.getItem('basket'))
        if (!basket) {
            basket = {
                products: []
            }
        }
        localStorage.setItem('basket', JSON.stringify(basket))
        dispatch({
            type: "GET_basket",
            data: basket.products
        })
    }
}

// ADVANTAGE
export function getProdcutAdvantage() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/advantage`)
        dispatch({
            type: "GET_ADVANTAGE",
            data
        })
    }
}
// ABOUT
export function getProdcutAbout() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/about`)
        dispatch({
            type: "GET_ABOUT",
            data
        })
    }
}
// slider
export function getProdcutSlider() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/slider`)
        dispatch({
            type: "GET_SLIDER",
            data
        })
    }
}
// NUMBER
export function getProdcutNumber() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/nomer`)
        dispatch({
            type: "GET_NUMBER",
            data
        })
    }
}
// help
export function getProdcutHelp() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/help`)
        dispatch({
            type: "GET_HELP",
            data
        })
    }
}
// public
export function getProdcutPublic() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/publuch`)
        dispatch({
            type: "GET_PUBLIC",
            data
        })
    }
}
// inform
export function getProdcutInform() {
    return async (dispatch) => {
        const { data } = await axios(`http://localhost:3000/informat`)
        dispatch({
            type: "GET_INFORM",
            data
        })
    }
}
// CART
export function getCart() {
    return (dispatch) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: []
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "GET_CART",
            payload: cart.products
        })
    }
}