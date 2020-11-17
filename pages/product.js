// page procut 对应的是api中的product 因为是要获取单个的product
// 这里面可以传递user是在app中统一传递给下面的其他page的
import axios from "axios"
import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributes'
import baseUrl from "../utils/baseUrl"

// 在每个product页面获得到当前的user和productID
// 将这两个变量传递到下面的组件中
function Product({product,user}) {
  // console.log({product});
  return <>
    <ProductSummary user={user} {...product}/>
    <ProductAttributes user={user} {...product}/>
  </>;
}

Product.getInitialProps= async ({query:{_id}})=>{
  const url = `${baseUrl}/api/product`;
  const payload = {params:{_id}};
  const response = await axios.get(url,payload);
  return {product: response.data};
};

export default Product;
