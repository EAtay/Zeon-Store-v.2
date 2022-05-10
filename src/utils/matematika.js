export const matemSell = (products) => {
    let totalQty = 0;
    let modelQty = 0
    // (!products.length) 
    //     ? 0
    //      : new Set(products.map(x => x.product.id)).size;
    let amount = 0;
    let discontAmount = 0;
    let totalSum = 0

    products.forEach(item => {
        totalQty += item.count;
        modelQty += item.count * 5
        amount += item.count * item.product.sell;
        const discount = item.product.sell * item.product.discountSale / 100;
        discontAmount += discount * item.count;
        totalSum += amount - discontAmount
    });


    return {
        totalQty,
        modelQty,
        amount,
        discontAmount,
        totalSum
    };
}

export const changeCountProduct = (count, id) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart) {
        return
    }
    cart.products = cart.products.map(item => {
        if (item.product.id === id) {
            item.count = count
            // item.pricePerCount = sumPricePerCount(item)
            // item.oldPricePerCount = sumOldPricePerCount(item)
        }
        return item
    })
    localStorage.setItem('cart', JSON.stringify(cart))
}