import { Menu, Container,Image,Icon} from "semantic-ui-react"
import Link from "next/link"
// 需要参数判断的时候 用打括号括起来
// 需要返回多个的时候 用<></> 作为一组返回
// Header({user}) 这个里面user是从layout中接收的
import {handleLogout} from '../../utils/auth'
import Router, {useRouter} from "next/router"
import NProgress from "nprogress"
// 这个是constructor
Router.onRouteChangeStart =()=>NProgress.start();
Router.onRouteChangeComplete =()=>NProgress.done();
Router.onRouteChangeError=()=>NProgress.done();



function Header({user}) {
  // check if user is of role "root" or "admin"
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;


  const router = useRouter();
  function isActive(route){
    return route===router.pathname;
  }
  
  return(
    <Menu stackable fluid id="menu" inverted>
    <Container text>
      <Link href="/">
        <Menu.Item header active={isActive("/")}>
          <Image size="mini" src="static/logo.svg" style={{marginRight: '1em'}}/>
          Shop Tracker
        </Menu.Item>
      </Link>

      <Link href="/cart">
        <Menu.Item header active={isActive("/cart")}>
          <Icon name="cart" size="large" />
          Cart
        </Menu.Item>
      </Link>

      { isRootOrAdmin && <Link href="/create">
        <Menu.Item header active={isActive("/create")}>
          <Icon name="add square" size="large" />
          Create
        </Menu.Item>
      </Link>}
      
      { user ? (<>
      <Link href="/account">
        <Menu.Item header active={isActive("/account")}>
          <Icon name="user" size="large" />
          Account
        </Menu.Item>
      </Link>

      
        <Menu.Item onClick={handleLogout} header>
          <Icon name="sign out" size="large" />
          Sign Out
        </Menu.Item>
        </>)
        :

        (<>
        <Link href="/login">
        <Menu.Item header active={isActive("/login")}>
          <Icon name="sign in" size="large" />
          Login
        </Menu.Item>
      </Link>


      <Link href="/signup">
        <Menu.Item header active={isActive("/signup")}>
          <Icon name="signup" size="large" />
          Signup
        </Menu.Item>
      </Link>
        </>)}

      

    </Container> 

    </Menu>
  );
}

export default Header;
