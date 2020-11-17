import React from "react"
import axios from "axios"
import ProductList from "../components/Index/ProductList"
import ProductPagination from "../components/Index/ProductPagination"
import baseUrl from "../utils/baseUrl"
//这里的products也可以写成props
// 这里的products是从下面的方法的新建的procuts来的
// 直接解析了这个props
// 这个返回来的所有的products的信息都会在这个home的这个product里
// 现在要做的就是把这些product传递给productList
// home对应的是api中的products
function Home({ products,totalPages}) 
{
  //console.log(products);
  
// React.useEffect(()=>{
//   getProducts();
// });

// async function getProducts()
// {
//   const url = "http://localhost:3000/api/products";
//   const response = await axios.get(url);
//   console.log(response);
// }
  return (<>
    <ProductList products={products}/>
    <ProductPagination totalPages={totalPages}/>
  </>);
  
  
  
  
}

Home.getInitialProps = async ctx =>
{
  const page = ctx.query.page ? ctx.query.page : "1";
  // 规定一页里有多少个商品
  const size = 9;
  // fetch data on server
  const url = `${baseUrl}/api/products`;
  const payload = {
    params: { page, size }
  };
  const response = await axios.get(url,payload);
  return response.data;
  //return response data as an object 
  // note: this object will be merged with existing props
}

export default Home;
