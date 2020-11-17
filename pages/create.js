import React from 'react'
import {Form,Input,TextArea,Button,Image,Message,Header,Icon} from "semantic-ui-react"
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import catchErrors from "../utils/catchErrors"
// 在handleChange中的const {name,value,files} = e.target 的name是要获取的是哪个input框
// if(name==='media')  prevState=>({...prevState,[name]:value}) 后面的[name]是对前面name的引用 但name是个获取到的argument 所以要用[]
// react.useEffect中 需要定义第二个参数 用来监听 每一次这个参数发生改变都需要出发useEffect这个方法





// 当清空的时候的默认值
const INITIAL_PRODUCT={
  name:'',
  price:'',
  media:'',
  description:''
};



function CreateProduct() {
  const [product,setProduct]= React.useState(INITIAL_PRODUCT);
  const [mediaPreview,setMediaPreview] = React.useState("");
  const [success,setSuccess] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [disabled,setDisabled] = React.useState(true);
  const [error,setError]=React.useState("");

  React.useEffect(()=>{
    const isProduct = Object.values(product).every(el=>Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  },[product]);

  async function handleImageUpload()
  {
    const data = new FormData();
    data.append("file",product.media);
    data.append("upload_preset","reactreserve");
    data.append("cloud_name","azanda");
    const response = await axios.post(process.env.CLOUDINARY_URL,data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event)
  {
    try {
      event.preventDefault();
      setLoading(true);
      // 再次提交的时候要设置error是空的
      setError("");
      const mediaUrl = await handleImageUpload();
      console.log({mediaUrl});
      const url =`${baseUrl}/api/product`;
      const {name,price,description}=product;
      // 这个里面的name price description是从上面product解析出来的
      // 外加上获取到的cloudinary中的url
      const payload = {name,price,description,mediaUrl};
      const response = await axios.post(url,payload);
      console.log(response);
      
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
      
    } catch (error) 
    {
      catchErrors(error,setError);
    }
    finally
    {
      setLoading(false);
    }
      
  }

  function handleChange(e)
  {
    const {name,value,files} = e.target;
    if(name==='media')
    {
      setProduct(prevState=>({...prevState,media:files[0]}));
      setMediaPreview(prevState=>(window.URL.createObjectURL(files[0])));
    }
    else
    {
      setProduct(prevState=>({...prevState,[name]:value}));
    }
  }



  return (
    <>
    <Header as="h2" block>
      <Icon name="add" color="orange"/>
      Create New Product
    </Header>

    <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
      
    <Message
      error
      header="Oops!"
      content={error}
      />
      
      <Message
      success
      icon="check"
      header="Success"
      content="Your product has been posted"
      />

      <Form.Group widths="equal">
        <Form.Field
        control={Input}
        name="name"
        label="Name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        />

        <Form.Field
        control={Input}
        name="price"
        label="Price"
        placeholder="Price"
        min="0.00"
        step="0.01"
        type='number'
        value={product.price}
        onChange={handleChange}
        />

        <Form.Field
        control={Input}
        name="media"
        label="Media"
        type="file"
        accept='image/*'
        content='Select Image'
        onChange={handleChange}
        />
      </Form.Group>
      <Image src={mediaPreview} rounded centered size="small"/>
      <Form.Field
        control={TextArea}
        name="description"
        label="Description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        />

        <Form.Field
        control={Button}
        disabled={loading || disabled}
        color="blue"
        icon="pencil alternate"
        content="Submit"
        type="submit"
        />
    </Form>




    </>
  );
}

export default CreateProduct;
