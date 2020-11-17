import React from "react"
import {Button,Form, Icon, Message, Segment} from "semantic-ui-react"
import Link from "next/link"
import catchErrors from "../utils/catchErrors"
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"

const INITIAL_USER={
  email:"",
  password:""
};



function Login() {
  const [user,setUser] = React.useState(INITIAL_USER);
  const [disabled,setDisabled] = React.useState(true);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState("");

  React.useEffect(()=>{
    const isUser = Object.values(user).every(el=>Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);

  },[user]);

  async function handleSubmit(e)
  {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      //console.log(user);
      // make request to login user
      const url = `${baseUrl}/api/login`;
      const payload = {...user};
      const response = await axios.post(url,payload);
      handleLogin(response.data);
      
    } catch (error) {
      catchErrors(error,setError);
    } finally
    {
      setLoading(false);
    }
  }

  function handleChange(e)
  {
      const {name,value}=e.target;
      setUser(prevState=>({...prevState,[name]:value}));
  }

  return (
    <>
    <Message
    attached
    icon="privacy"
    header="Welcome back"
    content="Log in with valid email"
    color="blue"
    />

    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
    <Message error header="Oops!" content={error}/>
    <Segment>
      <Form.Input
      fluid
      icon="envelope"
      iconPosition="left"
      label="Email"
      placeholder="Email"
      name="email"
      type="email"
      value={user.email}
      onChange={handleChange}
      />

      <Form.Input
      fluid
      icon="lock"
      iconPosition="left"
      label="Password"
      placeholder="Password"
      name="password"
      type="password"
      value={user.password}
      onChange={handleChange}
      />

      <Button
      disabled={disabled || loading}
      icon="sign in"
      type="submit"
      color="orange"
      content="Login"
      />

    </Segment>

    </Form>

    <Message>
      <Icon name="help"/>
      New user?{""}
      <Link href="/signup">
        <a>
          Sign up here
        </a>
      
      </Link>{""}
      instead.

    </Message>


    </>
  );
}

export default Login;
