import { Item, Lable} from 'semantic-ui-react'
import AddProductToCart from './AddProductToCart'
// 从单个product中接收的user
function ProductSummary({name, mediaUrl, _id, price, sku,user}) {
  return <>
  <Item.Group>
    <Item>
      <Item.Image size='medium' src={mediaUrl}/>
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
        <p>${price}</p>
        <label>SKU:{sku}</label>
        </Item.Description>
        <Item.Extra>
          <AddProductToCart user={user} productId={_id}/>
        </Item.Extra>
      </Item.Content>
      
    </Item>

  </Item.Group>
  
  </>;
}

export default ProductSummary;
