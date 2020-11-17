import UserDetail from "../../models/UserDetail"
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb();

export default async (req,res)=>{
    switch(req.method)
    {
        case "GET":
            await handleGetRequest(req,res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}
// 从app传过来的payload中带着token
async function handleGetRequest(req,res)
{

    if(!("authorization" in req.headers ))
    {
        return res.status(401).send("No authorization token ");
    }

    try {
        // 在signup api中 
        // const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET,{expiresIn:"7d"});
        // jwt sign 的名字是userId
        const {userId} = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
            // _id是db中的名字
            //userId 是用jwt解析出来的 
        const user = await UserDetail.findOne({_id:userId});
        if(user)
        {
            res.status(200).json(user);
        } else
        {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(403).send("Invalid token");
    }

}


async function handlePutRequest(req,res)
{
    const { _id, role } = req.body;
    await UserDetail.findOneAndUpdate({_id},{role});
    res.status(203).send("User updated");
}