function calculateCartTotal(products)
{
    const total = products.reduce((acc,el)=>{
        acc+= el.product.price * el.quantity;
        return acc;
        // 设置acc的initial value=0
    },0);
    const cartTotal = ((total*100)/100).toFixed(2);
    const stripeTotal = Number((total*100).toFixed(2));

    return { cartTotal, stripeTotal };
}

export default calculateCartTotal;