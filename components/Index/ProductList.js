import {Card } from "semantic-ui-react";
// 第一个productlist里的参数products是从index.js那里传递过来的props
// href:`/product?_id=${product._id}` 这个是query传递值
// 通过router给product 页面传递_id value
// 这个是放在index page上的一部分

function ProductList({ products }) {

  function mapProductsToItems(parameter)
  {
    return parameter.map(product=>(
      {
        header: product.name,
        image: product.mediaUrl,
        meta: `$${product.price}`,
        color:'teal',
        fluid:true,
        childKey: product._id,
        href:`/product?_id=${product._id}`
      }
    ));
  }


  return (
    <Card.Group 
    stackable 
    itemsPerRow='3' 
    centered
    items={mapProductsToItems(products)} />
  );
}

export default ProductList;
