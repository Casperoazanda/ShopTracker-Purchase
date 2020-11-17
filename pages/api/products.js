//import products from "../../static/products.json"
// 这个是home page得到所有products的接口
import connectDb from "../../utils/connectDb"
import Product from "../../models/Product"

connectDb();

export default async (req,res)=>{
    const { page, size } = req.query;
    // Convert queryString values to number
    const pageNum = Number(page);
    // 当前是第几页 是可以获取的 但一页有多少个size 是自定义的
    const pageSize = Number(size);
    let products = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if(pageNum ===1)
    {
        products = await Product.find().limit(pageSize);
    }
    else{
        const skips = pageSize * (pageNum-1);
        products = await Product.find().skip(skips).limit(pageSize);
    }

    res.status(200).json({products,totalPages});
    
}