import React from "react"
import { Segment } from 'semantic-ui-react'
import CartItemList from "../components/Cart/CartItemList"
import CartSummary from "../components/Cart/CartSummary"
import { parseCookies } from 'nookies'
import axios from 'axios'
import cookie from "js-cookie"
import baseUrl from '../utils/baseUrl'
import catchErrors from "../utils/catchErrors"

function Cart({ products, user }) {
  // 因为之后会实现删除的方法 所以不可以直接用products传递参数
  // 需要用删除完之后的最先的cartProducts来传递参数
  const [cartProducts,setCartProducts] = React.useState(products);
  const [success,setSuccess] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  // 这个方法是传递给cartItemList的时候用的 所以parameter是product_id
  // 方法是父级的方法 是被子集调用的 
  // 只有在cartItemList中点删除的时候 这个方法才会被调用 
  async function handleRemoveFromCart(productId)
  {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token}
    };
    const response = await axios.delete(url,payload);
    setCartProducts(response.data);
  }


  // 这个方法是要传给cartSummary的 当这个方法执行完后 才可以显示cartItemList
  async function handleCheckout(paymentData)
  {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const payload = { paymentData };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error,window.alert);
    }
    finally{
      setLoading(false);
    }
  }




  // console.log(products);
  return (
    <Segment loading={loading}>
      <CartItemList
      handleRemoveFromCart = {handleRemoveFromCart}
      user = {user}
      products = {cartProducts}
      success={success}
      />
      <CartSummary 
      products = {cartProducts}
      handleCheckout = {handleCheckout}
      success={success}
      />
    </Segment>
  );
}

Cart.getInitialProps = async ctx=>
{
  const {token} = parseCookies(ctx);
  if(!token)
  {
    return {products:[]};
  }
  const url = `${baseUrl}/api/cart`;
  const payload = {headers:{Authorization:token}};
  const response = await axios.get(url,payload);
  return {products:response.data};
};

export default Cart;
