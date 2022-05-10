export const addAndDeleteProductInFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem('favorites'))
    let favoriteProduct = {
        product: product,
    }
    let newFavorites = favorites.products.filter(item => item.product.id === product.id)
    if (newFavorites.length) {
        favorites.products = favorites.products.filter(item => item.product.id !== product.id)
    } else {
        favorites.products.push(favoriteProduct)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

export const deleteCart = (product, color) => {
    let basket = JSON.parse(localStorage.getItem('basket'))

    const index = basket.products.findIndex(item => item.product.id === product.id && item.color === color);
    if (index !== -1) {
        basket.products.splice(index, 1);
        localStorage.setItem('basket', JSON.stringify(basket))
    }
}


export const addAndDeleteProductInbasket = (product, color, count = 1) => {
    let basket = JSON.parse(localStorage.getItem('basket'))
    let basketProduct = {
        product: product,
        count: count,
        color: color
    }

    let existItem = basket.products.find(item => item.product.id === product.id && item.color === color);
    if (existItem) {
        existItem.count = count;

    } else {
        basket.products.push(basketProduct)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
}