import App from "next/app";
import Layout from "../components/_App/Layout"
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from "../utils/baseUrl"
import axios from "axios"
import Router from 'next/router'

class MyApp extends App {

  static async getInitialProps({Component, ctx})
  {
    // 原本返回的应该是cookie 但因为cookie.token 本身是cookie中的一部分 可以直接将token destructure
    const {token} = parseCookies(ctx);
    let pageProps = {};
    if(Component.getInitialProps)
    {
      pageProps= await Component.getInitialProps(ctx);
    }

    // 判断获取到的token是否有效
    // 若没有token值 要不就是身份登陆过期
    // 或者是压根之前没有注册过
    // 这时判断用户是否访问的是create account router， 若是 此时用户没有权限访问这两个router 需要将他们redirect

    if(!token)
    {
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname==='create';
      if(isProtectedRoute)
      {
        // 需要在auth中加这个方法 redirect用户
        redirectUser(ctx,'/login');
      }

    } else
    {
      // 如果有token 那么请求访问api/account
      try {
        const payload = {headers:{Authorization:token}};
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url,payload);
        const user = response.data;

        // check if the user get the permission for creating product
        // if authenticated, but not of role "admin" or "root" redirect from "/create" page
        const isRoot = user.role ==='root';
        const isAdmin = user.role === 'admin';
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname=== '/create';
        if(isNotPermitted)
        {
          redirectUser(ctx,'/');
        }
        
      
        
        
      // 将获取到的user 给pageProps.user 让这个向下传递给layout 和component
        pageProps.user = user;
      } catch (error) {
        // there is a cookie, but this cookie is invalid
        console.error("Error getting current user",error);
        // 1. throw out invalid token
        destroyCookie(ctx,"token");
        // 2. redirect to login
        redirectUser(ctx,"/login");
      }
    }

    
    
    
    return {pageProps:pageProps};
  }


  // 使所有窗口都logout
  componentDidMount() {
    window.addEventListener("storage",this.syncLogout);
  }

  syncLogout = event =>
  {
    if(event.key === 'logout')
    {
      console.log("logged out from the storage");
      Router.push('/login');
    }

  }



  render() {
    const { Component,pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps}/>

      </Layout>
    )
    
  }
}

export default MyApp;
