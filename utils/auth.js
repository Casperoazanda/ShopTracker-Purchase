import cookie from "js-cookie"
import Router from "next/router"

export function handleLogin(token)
{
    cookie.set("token",token);
    Router.push("/account");
}
// 如果用户没有token 且在访问不应该访问的page redirect
// 这个方法用在app.js
export function redirectUser(ctx,location)
{
    if(ctx.req)
    {
        ctx.res.writeHead(302,{Location:location});
        ctx.res.end();
    }
    else{
        Router.push(location);
    }
}

export function handleLogout()
{
    cookie.remove("token");
    // 如果开两个同样网站的页面 只删除cookie 只能让一个网页logout
    // 需要在一个网页点击logout 所有网页都logout
    // 需要在app中也设置
    window.localStorage.setItem("logout",Date.now());
    Router.push('/login');
    
}
